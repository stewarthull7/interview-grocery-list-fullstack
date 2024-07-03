import { Outlet, createFileRoute } from '@tanstack/react-router'
import Container from '@mui/material/Container'

export const Route = createFileRoute('/_default')({
  component: LayoutComponent
})

function LayoutComponent() {
  return (
    <div>
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}