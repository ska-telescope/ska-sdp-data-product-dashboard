import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  Button,
  ButtonColorTypes,
  ButtonVariantTypes,
  DropDown,
  TextEntry
} from '@ska-telescope/ska-gui-components';
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import { noUser } from '@services/mocking/mocksAuth';
import { USERS, IS_DEV } from '@utils/constants';

// TODO : Once the Dummy users have been removed, maxWidth property should be removed from Dialog

// NOTE : HARD CODED COLOR IN CHECK BOXES AS THEY ARE ONLY TEMPORARY

export interface UserProps {
  LoginFunction: Function;
  CancelFunction: Function;
}

const MSG = "Buttons below simulate login's whilst we are in this development phase";

const MockSignInDialog = ({ LoginFunction, CancelFunction }: UserProps) => {
  const { t } = useTranslation('authentication');
  const [selectedUserName, setSelectedUserName] = React.useState(''); // Username selected on modal
  const [appendedUsername, setAppendedUsername] = React.useState(''); // Telescope appended username String
  const [password, updatePassword] = React.useState('dummyPassword'); // Password String

  const [authUser, setAuthUser] = React.useState(noUser); // Authed user in memory, default mocked user
  const { updateUser } = storageObject.useStore(); // Actual user in store.

  const [open, setOpen] = React.useState(false);
  const [midChecked, setMidChecked] = React.useState(false);
  const [lowChecked, setLowChecked] = React.useState(false);
  const { application, updateAppContent2 } = storageObject.useStore();

  async function updateMockUser(newUN: string) {
    setAuthUser((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        username: newUN
      }
    }));
  }

  React.useEffect(() => {
    updateUser(authUser.user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser.user]);

  const handleClose = () => {
    updateAppContent2(false);
  };

  React.useEffect(() => {
    setOpen(application.content2 === true);
  }, [application.content2]);

  React.useEffect(() => {
    const appendTelescope = () => {
      let newAppendedUsername = selectedUserName;
      if (midChecked) {
        newAppendedUsername += '-mid';
      }
      if (lowChecked) {
        newAppendedUsername += '-low';
      }
      return newAppendedUsername;
    };

    setAppendedUsername(appendTelescope());
    updatePassword('dummyPassword');
  }, [selectedUserName, lowChecked, midChecked]);

  async function loginClicked(event: { preventDefault: () => void }) {
    event.preventDefault();
    handleClose();
    updateMockUser(appendedUsername);
    updateAppContent2(false);
    LoginFunction();
  }

  const cancelClicked = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    handleClose();
    CancelFunction();
  };

  return (
    <div id="loginId">
      <Dialog maxWidth="xl" open={open} onClose={handleClose}>
        <DialogContent>
          {IS_DEV && !application.content1 && (
            <Grid container direction="row" justifyContent="space-evenly">
              <Grid>
                <Typography fontSize="h4">{MSG}</Typography>
              </Grid>
            </Grid>
          )}

          {IS_DEV && !application.content1 && (
            <Grid container direction="row" justifyContent="space-evenly">
              <Grid item xs={3}>
                <DropDown
                  label="USER"
                  options={USERS}
                  setValue={setSelectedUserName}
                  testId="testId"
                  value={selectedUserName}
                />
              </Grid>
              <Grid>
                <FormControlLabel
                  value="MID TELESCOPE"
                  control={
                    <Checkbox
                      checked={midChecked}
                      onChange={() => setMidChecked(!midChecked)}
                      sx={{
                        '&.Mui-checked': {
                          color: 'green'
                        }
                      }}
                    />
                  }
                  label="MID TELESCOPE"
                  labelPlacement="start"
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />
              </Grid>
              <Grid>
                <FormControlLabel
                  value="LOW TELESCOPE"
                  control={
                    <Checkbox
                      checked={lowChecked}
                      onChange={() => setLowChecked(!lowChecked)}
                      sx={{
                        '&.Mui-checked': {
                          color: 'green'
                        }
                      }}
                    />
                  }
                  label="LOW TELESCOPE"
                  labelPlacement="start"
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />
              </Grid>
            </Grid>
          )}
          <Box>
            <Card variant="outlined">
              <CardContent>
                <Typography component="h1" variant="h5">
                  {t('label.title')}
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <TextEntry
                    errorText=""
                    helperText="Required field"
                    label={t('label.email')}
                    testId="emailId"
                    setValue={setAppendedUsername}
                    value={appendedUsername}
                  />

                  <TextEntry
                    errorText=""
                    helperText=""
                    label={t('label.password')}
                    password
                    disabled
                    setValue={updatePassword}
                    testId="passwordId"
                    value={password}
                  />

                  <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Button
                        ariaDescription={t('button.confirm')}
                        color={ButtonColorTypes.Success}
                        disabled={!(password.length && appendedUsername.length)}
                        icon={<DoneOutlinedIcon />}
                        label={t('button.confirm')}
                        onClick={(e: { preventDefault: () => void }) => loginClicked(e)}
                        testId="loginConfirm"
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
                        testId="loginCancel"
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

export default MockSignInDialog;
