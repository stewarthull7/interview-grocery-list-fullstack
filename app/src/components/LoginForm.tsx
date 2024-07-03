import { Controller } from 'react-hook-form'
import { TextField, Button, Box, Grid, Alert } from '@mui/material'

import { useLogin } from 'hooks/useAuth'
import { useApiForm } from 'hooks/useApiForm'
import { Link } from '@tanstack/react-router'

const LoginForm = () => {
  const { mutateAsync: login } = useLogin()
  const { 
    handleSubmit, 
    control, 
    formState: { errors }, 
    handleApiErrors 
  } = useApiForm<LoginFormRequest>()

  const onSubmit = async (data: LoginFormRequest) => {
    await login(data, {
      onError: (error) => {
        handleApiErrors(error)
      }
    })
  }

  return (
    <Box sx={{ mt: 1 }}>
      {!!errors.root?.server && <Alert severity="error">{errors.root?.server.message}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field} 
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              error={!!errors.email}
              helperText={errors.email && errors.email.message}
              autoComplete="email"
              autoFocus
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field} 
              type="password"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              error={!!errors.password}
              helperText={errors.password && errors.password.message}
              autoComplete="current-password"
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link to="/register">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default LoginForm
