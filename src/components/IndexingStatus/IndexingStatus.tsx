import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { ButtonColorTypes, StatusIcon } from '@ska-telescope/ska-gui-components';

const STATUS_SIZE = 20;

interface IndexingStatusProps {
  isIndexing: boolean;
  indexingProgress?: any;
  isLoading?: boolean;
  apiStatus?: any;
  apiRunning?: boolean;
}

function IndexingStatus({
  isIndexing,
  indexingProgress,
  isLoading,
  apiStatus,
  apiRunning
}: IndexingStatusProps) {
  const { t } = useTranslation('dpd');

  const getStatusLevel = (): number => {
    if (!apiRunning) {
      return 1; // Error/fault state
    }
    if (isIndexing) {
      return 3; // Warning/in-progress state
    }
    if (isLoading) {
      return 3; // Warning/in-progress state
    }
    return 0; // Success/ready state
  };

  const getStatusLabel = (): string => {
    if (!apiRunning) {
      return 'status.error';
    }
    if (isIndexing && indexingProgress?.in_progress) {
      if (indexingProgress.files_processed > 0) {
        return 'status.indexing';
      }
      return 'status.scanning';
    }
    if (isLoading) {
      return 'status.loading';
    }
    return 'status.ready';
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
            {isIndexing && indexingProgress?.in_progress && (
              <>
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
                          (indexingProgress.files_processed / indexingProgress.total_files) * 100
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
            {isLoading && !isIndexing && (
              <Typography color="inherit" data-testid="loading-status-message">
                {t('toolTip.indexingStatus.loadingMessage')}
              </Typography>
            )}
            {apiStatus && (
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
