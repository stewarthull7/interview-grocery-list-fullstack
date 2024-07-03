import { Controller } from 'react-hook-form'
import { TextField, Button, Box, Grid, Alert } from '@mui/material'

import { useRegister } from 'hooks/useAuth'
import { useApiForm } from 'hooks/useApiForm'
import { Link } from '@tanstack/react-router'

const RegisterForm = () => {
  const { mutateAsync: register } = useRegister()
  const { 
    handleSubmit, 
    control, 
    formState: { errors }, 
    handleApiErrors 
  } = useApiForm<RegisterFormRequest>()

  const onSubmit = async (data: RegisterFormRequest) => {
    await register(data, {
      onError: (error) => {
        handleApiErrors(error)
      }
    })
  }

  return (
    <Box sx={{ mt: 1 }}>
      {!!errors.root?.server && <Alert severity="error">{errors.root?.server.message}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field} 
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={!!errors.firstName}
                  helperText={errors.firstName && errors.firstName.message}
                  autoFocus
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field} 
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={!!errors.lastName}
                  helperText={errors.lastName && errors.lastName.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field} 
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email && errors.email.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field} 
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!errors.password}
                  helperText={errors.password && errors.password.message}
                />
              )}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item>
            <Link to="/login">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default RegisterForm
