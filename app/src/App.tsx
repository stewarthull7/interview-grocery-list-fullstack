import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { RouterProvider } from '@tanstack/react-router'

import { router } from './router'
import { useAuth } from 'hooks/useAuth'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@utils/client'

function InnerApp() {
  const auth = useAuth()
  return (
    <RouterProvider router={router} context={{ auth }} />
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InnerApp />
    </QueryClientProvider>
  )
}

export default App
