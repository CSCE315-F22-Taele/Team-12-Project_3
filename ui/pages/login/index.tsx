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
  const { register, handleSubmit, errors } = useForm<{
    email: string;
    password: string;
    isSignUp: boolean;
  }>();

  const onSubmit = (data: { email: string; password: string; isSignUp: boolean }) => {
    // Perform login or sign up with the provided data
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          inputRef={<input {...register('test', { required: true, pattern: /^\S+@\S+$/i })} />}
          error={Boolean(errors.email)}
          helperText={errors.email && 'Email is required and must be a valid email address.'}
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          fullWidth
          margin="normal"
          inputRef={...register('test', { required: true })}
          error={Boolean(errors.password)}
          helperText={errors.password && 'Password is required.'}
        />

        <FormControlLabel
          control={<Checkbox name="isSignUp" inputRef={register} />}
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
