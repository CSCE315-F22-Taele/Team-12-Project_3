import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Container,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
} from '@mui/material';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors }} = useForm<{
    email: string;
    password: string;
    isSignUp: boolean;
  }>();

  const onSubmit = (data: { email: string; password: string; isSignUp: boolean }) => {
    // Perform login or sign up with the provided data
  };

  return (
    <Container>
      <head>
				<title>Login</title>
		  </head>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          error={Boolean(errors.email)}
          helperText={errors.email && 'Email is required and must be a valid email address.'}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register('password', { required: true })}
          error={Boolean(errors.password)}
          helperText={errors.password && 'Password is required.'}
        />

        <FormControlLabel
          control={<Checkbox {...register('isSignUp')} />}
          label="Sign up"
        />

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
