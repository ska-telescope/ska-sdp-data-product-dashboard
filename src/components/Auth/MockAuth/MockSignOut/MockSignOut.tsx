/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Button, ButtonColorTypes, ButtonVariantTypes } from '@ska-telescope/ska-gui-components';
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';

export interface UserProps {
  LogoutFunction: Function;
  CancelFunction: Function;
}

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const MockSignOutDialog = ({ LogoutFunction, CancelFunction }: UserProps) => {
  const { t } = useTranslation('authentication');
  const { updateUser } = storageObject.useStore();
  const [open, setOpen] = React.useState(false);
  const { application, updateAppContent3 } = storageObject.useStore();

  const handleClose = () => {
    updateAppContent3(false);
  };

  React.useEffect(() => {
    setOpen(application.content3 === true);
  }, [application.content3]);

  function ClearUser() {
    updateUser({
      id: '',
      username: '',
      email: '',
      language: '',
      token: ''
    });
  }

  async function confirmClicked(event: { preventDefault: () => void }) {
    event.preventDefault();
    ClearUser();
    handleClose();
    LogoutFunction();
  }

  const cancelClicked = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    handleClose();
    CancelFunction();
  };

  return (
    <div id="logoutId">
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box>
            <Card variant="outlined">
              <CardContent>
                <Typography component="h1" variant="h5">
                  {t('label.signOut')}
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Button
                        ariaDescription={t('button.confirm')}
                        color={ButtonColorTypes.Success}
                        icon={<DoneOutlinedIcon />}
                        label={t('button.confirm')}
                        onClick={(e: { preventDefault: () => void }) => confirmClicked(e)}
                        testId="logoutConfirm"
                        variant={ButtonVariantTypes.Contained}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        ariaDescription={t('button.confirm')}
                        color={ButtonColorTypes.Error}
                        icon={<DoNotDisturbAltOutlinedIcon />}
                        label={t('button.cancel')}
                        onClick={(e: { preventDefault: () => void }) => cancelClicked(e)}
                        testId="logoutCancel"
                        variant={ButtonVariantTypes.Contained}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MockSignOutDialog;
