import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography';

export const Route = createFileRoute('/_auth')({
  component: LayoutComponent
})

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="/">
        GojiLabs Grocery List
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function LayoutComponent() {
  return (
    <Container maxWidth="xs">
      <Outlet />
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}