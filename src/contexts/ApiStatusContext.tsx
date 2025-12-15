import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GetAPIStatus } from '@services/GetAPIStatus/GetAPIStatus';
import { API_REFRESH_RATE } from '@utils/constants';

interface ApiStatusContextType {
  apiRunning: boolean;
  apiIndexing: boolean;
  apiError: string | null;
  apiStatus: any | null;
  indexingProgress: any | null;
  isLoading: boolean;
  dataStoreLastModifiedTime: string | null;
  refreshStatus: () => Promise<void>;
}

const ApiStatusContext = createContext<ApiStatusContextType | undefined>(undefined);

interface ApiStatusProviderProps {
  children: ReactNode;
}

export function ApiStatusProvider({ children }: ApiStatusProviderProps) {
  const [apiRunning, setApiRunning] = useState(false);
  const [apiIndexing, setApiIndexing] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<any | null>(null);
  const [indexingProgress, setIndexingProgress] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataStoreLastModifiedTime, setDataStoreLastModifiedTime] = useState<string | null>(null);

  const refreshStatus = async () => {
    try {
      const results = await GetAPIStatus();
      if (results?.data) {
        setApiRunning(results.data?.api_running ?? false);
        setApiIndexing(results.data?.indexing ?? false);
        setIndexingProgress(results.data?.indexing_progress || null);
        setApiStatus(results.data);

        // Check for backend errors in priority order
        let backendError = null;

        // Check metadata store error (top level, added when DB is down)
        if (results.data.metadata_store_status?.error) {
          backendError = `PostgreSQL: ${results.data.metadata_store_status.error}`;
        }
        // Check db_status error
        else if (results.data.metadata_store_status?.db_status?.error) {
          backendError = `PostgreSQL: ${results.data.metadata_store_status.db_status.error}`;
        }
        // Check if database is not running
        else if (results.data.metadata_store_status?.running === false) {
          backendError = 'PostgreSQL database is not running';
        }
        // Check search store error
        else if (results.data.search_store_status?.error) {
          backendError = `Search Store: ${results.data.search_store_status.error}`;
        }

        setApiError(backendError);

        const newTimestamp = results.data.metadata_store_status?.last_metadata_update_time;
        if (newTimestamp !== dataStoreLastModifiedTime) {
          setDataStoreLastModifiedTime(newTimestamp);
        }
      } else {
        setApiRunning(false);
        setDataStoreLastModifiedTime(null);
        setIndexingProgress(null);
        setApiStatus(null);
        setApiError(null);
      }
    } catch (error) {
      setApiRunning(false);
      setApiIndexing(false);
      setIndexingProgress(null);
      setApiStatus(null);
      setDataStoreLastModifiedTime(null);
      setApiError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch and periodic polling
  useEffect(() => {
    refreshStatus();
    const interval = setInterval(() => {
      refreshStatus();
    }, API_REFRESH_RATE);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: ApiStatusContextType = {
    apiRunning,
    apiIndexing,
    apiError,
    apiStatus,
    indexingProgress,
    isLoading,
    dataStoreLastModifiedTime,
    refreshStatus
  };

  return <ApiStatusContext.Provider value={value}>{children}</ApiStatusContext.Provider>;
}

export function useApiStatus(): ApiStatusContextType {
  const context = useContext(ApiStatusContext);
  if (context === undefined) {
    throw new Error('useApiStatus must be used within an ApiStatusProvider');
  }
  return context;
}
