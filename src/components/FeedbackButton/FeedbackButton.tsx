import * as React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface FeedbackButtonProps {
  href: string;
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({ href }) => {
  const { t } = useTranslation('dpd');

  return (
    <Button
      variant="contained"
      component="a"
      size="large"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="feedback-button"
      sx={{
        textTransform: 'none',
        color: 'white',
        bgcolor: 'success.main',
        '&:hover': { bgcolor: 'success.dark' },
      }}
    >
      {t('label.leaveFeedback')}
    </Button>
  );
};
export default FeedbackButton;
