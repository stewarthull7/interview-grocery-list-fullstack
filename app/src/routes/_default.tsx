import { Outlet, createFileRoute } from '@tanstack/react-router'
import Container from '@mui/material/Container'
import TopNavigation from '@components/TopNavigation'

export const Route = createFileRoute('/_default')({
  component: LayoutComponent
})

function LayoutComponent() {
  return (
    <div>
      <TopNavigation />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}