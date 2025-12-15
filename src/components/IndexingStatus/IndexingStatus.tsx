import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { ButtonColorTypes, StatusIcon } from '@ska-telescope/ska-gui-components';
import { useApiStatus } from '@contexts/ApiStatusContext';

const STATUS_SIZE = 20;

interface IndexingStatusProps {
  isLoading?: boolean;
}

function IndexingStatus({ isLoading }: IndexingStatusProps) {
  const { t } = useTranslation('dpd');
  const {
    apiRunning,
    apiIndexing: isIndexing,
    apiError,
    apiStatus,
    indexingProgress
  } = useApiStatus();

  const getStatusLevel = (): number => {
    // Red: API not running or explicit error
    if (!apiRunning || apiError) {
      return 1; // Error/fault state (red square with X)
    }
    // Blue info: Backend healthy but indexing in progress
    if (isIndexing && indexingProgress?.in_progress) {
      return 4; // Info state (blue triangle with "i")
    }
    // Green: Backend is healthy and idle
    return 0; // Success/ready state (green circle with tick)
  };

  const getStatusLabel = (): string => {
    if (!apiRunning) {
      return 'status.apiOffline';
    }
    if (apiError) {
      return 'status.error';
    }
    if (isIndexing && indexingProgress?.in_progress) {
      return 'status.indexing';
    }
    return 'status.healthy';
  };

  return (
    <Box
      sx={{
        display: 'inline-block',
        verticalAlign: 'middle'
      }}
    >
      <Tooltip
        title={
          <>
            <Typography color="inherit" data-testid="indexing-status-label">
              <strong>{t('toolTip.indexingStatus.status')}:</strong>{' '}
              {t(`toolTip.indexingStatus.${getStatusLabel()}`)}
            </Typography>
            {apiError && (
              <Typography
                color="inherit"
                data-testid="api-error-message"
                sx={{
                  mt: 0.5,
                  fontSize: '0.9em',
                  wordBreak: 'break-word',
                  backgroundColor: 'rgba(255, 0, 0, 0.1)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  border: '1px solid rgba(255, 0, 0, 0.3)'
                }}
              >
                <strong>Error:</strong> {apiError}
              </Typography>
            )}
            {!apiError && apiStatus && (
              <>
                <Typography
                  color="inherit"
                  sx={{ borderTop: '1px solid rgba(255,255,255,0.2)', mt: 1, pt: 1 }}
                >
                  <strong>{t('toolTip.indexingStatus.apiVersion')}:</strong> {apiStatus.api_version}
                </Typography>
                {apiStatus.metadata_store_status && (
                  <Typography color="inherit">
                    <strong>{t('toolTip.indexingStatus.metadataStore')}:</strong>{' '}
                    {apiStatus.metadata_store_status.store_type}
                  </Typography>
                )}
                {apiStatus.search_store_status && (
                  <Typography color="inherit">
                    <strong>{t('toolTip.indexingStatus.searchStore')}:</strong>{' '}
                    {apiStatus.search_store_status.metadata_search_store_in_use}
                  </Typography>
                )}
                {apiStatus.sdp_config_db && (
                  <Typography color="inherit">
                    <strong>{t('toolTip.indexingStatus.sdpConfig')}:</strong>{' '}
                    {apiStatus.sdp_config_db.connected
                      ? t('toolTip.indexingStatus.sdpConfigConnected')
                      : t('toolTip.indexingStatus.sdpConfigDisconnected')}
                  </Typography>
                )}
                {apiStatus.metadata_store_status?.dlm_interface_enabled !== undefined && (
                  <Typography color="inherit">
                    <strong>{t('toolTip.indexingStatus.dlmInterface')}:</strong>{' '}
                    {apiStatus.metadata_store_status.dlm_interface_enabled
                      ? t('toolTip.indexingStatus.dlmInterfaceEnabled')
                      : t('toolTip.indexingStatus.dlmInterfaceDisabled')}
                    {apiStatus.metadata_store_status.dlm_interface_enabled &&
                      apiStatus.metadata_store_status.dlm_interface_status?.number_of_items !==
                        null && (
                        <span>
                          {' '}
                          ({
                            apiStatus.metadata_store_status.dlm_interface_status.number_of_items
                          }{' '}
                          {t('toolTip.indexingStatus.dlmItems')})
                        </span>
                      )}
                  </Typography>
                )}
                {isIndexing && indexingProgress?.in_progress && (
                  <>
                    <Typography
                      color="inherit"
                      sx={{ borderTop: '1px solid rgba(255,255,255,0.2)', mt: 1, pt: 1 }}
                    >
                      <strong>{t('toolTip.indexingStatus.indexingInProgress')}</strong>
                    </Typography>
                    {indexingProgress.files_processed > 0 && (
                      <>
                        <Typography color="inherit" data-testid="indexing-status-files">
                          <strong>{t('toolTip.indexingStatus.filesProcessed')}:</strong>{' '}
                          {indexingProgress.files_processed}
                          {indexingProgress.total_files > 0 && ` / ${indexingProgress.total_files}`}
                        </Typography>
                        {indexingProgress.total_files > 0 && (
                          <Typography color="inherit" data-testid="indexing-status-progress">
                            <strong>{t('toolTip.indexingStatus.progress')}:</strong>{' '}
                            {Math.round(
                              (indexingProgress.files_processed / indexingProgress.total_files) *
                                100
                            )}
                            %
                          </Typography>
                        )}
                      </>
                    )}
                    {indexingProgress.indexing_step && (
                      <Typography
                        color="inherit"
                        data-testid="indexing-status-step"
                        sx={{ fontSize: '0.85em', fontStyle: 'italic', mt: 0.5 }}
                      >
                        {t('toolTip.indexingStatus.currentStep')}: {indexingProgress.indexing_step}
                      </Typography>
                    )}
                  </>
                )}
              </>
            )}
          </>
        }
      >
        <IconButton
          aria-label={t('label.indexingStatus')}
          sx={{ '&:hover': { backgroundColor: 'primary.dark' }, p: 1.3 }}
          color={ButtonColorTypes.Inherit}
        >
          <StatusIcon testId="indexing-status-icon" level={getStatusLevel()} size={STATUS_SIZE} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default IndexingStatus;
