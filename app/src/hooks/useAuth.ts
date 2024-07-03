import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { login, register } from '@services/auth'

export const useAuth = () => {
  const isAuthenticated = () => localStorage.getItem('accessToken') ? true : false;

  return {
    isAuthenticated,
  }
}

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('accessToken');
    navigate({ to: '/login' })
  }

  return {
    logout,
  }
}

export const useLogin = () => {
  const navigate = useNavigate();
  
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginFormRequest) => login(data),
    onSuccess: () => {
      navigate({ to: '/'})
    },
  })
}

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['register'],
    mutationFn: (data: RegisterFormRequest) => register(data),
    onSuccess: () => {
      navigate({ to: '/'})
    },
  })
}