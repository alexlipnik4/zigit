import React, { FormEvent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ILoginProps } from './Login.model';
import CircularProgress from '@material-ui/core/CircularProgress';
import { EMAIL, PASSWORD } from './consts';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login: React.FC<ILoginProps> = ({
    onSubmit,
    onChange,
    userData,
    loading,
    displayError,
    emailErrorText,
    passwordErrorText,
    validationErrors,
}) => {
  const classes = useStyles();
  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
            onChange={e => onChange(e as FormEvent<HTMLInputElement>)}
            variant="outlined"
            margin="normal"
            fullWidth
            id={EMAIL}
            label="Email Address"
            name={EMAIL}
            autoComplete={EMAIL}
            autoFocus
            value={userData.email}
            error={displayError('email')}
            helperText={emailErrorText}
        />
        <TextField
            onChange={e => onChange(e as FormEvent<HTMLInputElement>)}
            variant="outlined"
            margin="normal"
            fullWidth
            name={PASSWORD}
            label={PASSWORD}
            type={PASSWORD}
            id={PASSWORD}
            autoComplete="current-password"
            value={userData.password}
            error={displayError('password')}
            helperText={passwordErrorText}
        />
        <Button
          disabled={loading || validationErrors.length > 0}
          onClick={onSubmit}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {console.log(loading, validationErrors)}
            Sign In
            {
              loading && validationErrors.length === 0 && <CircularProgress style={{position: 'absolute'}} size={20} />
            }
        </Button>
      </div>
    </Container>
  );
}

export default Login;