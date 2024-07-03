interface GroceryItem {
  id: string
  name: string
  quantity?: number
  priority?: number
  status?: 'HAVE' | 'WANT'
  createdAt?: string
  updatedAt?: string
}

interface GroceryFormItem {
  name: string
  quantity?: number
}

interface LoginFormRequest {
  email: string
  password: string
}

interface LoginFormResponse {
  accessToken: string
  data: User
}

interface RegisterFormRequest {
  email: string
  password: string
  firstName?: string
  lastName?: string
}

interface RegisterFormResponse extends LoginFormResponse {}

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
}
