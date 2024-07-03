import { kyClient } from "@utils/kyClient"

const storeAccessToken = (token: string) => {
  localStorage.setItem('accessToken', token);
}

export const login = async (params: LoginFormRequest) => {
  const response = await kyClient.post(`auth/login`, { json: params }).json<LoginFormResponse>()

  if (response.accessToken) {
    storeAccessToken(response.accessToken);
  }
  
  return response.data
}

export const register = async (params: RegisterFormRequest) => {
  const response = await kyClient.post(`auth/register`, { json: params }).json<RegisterFormResponse>()
  
  if (response.accessToken) {
    storeAccessToken(response.accessToken);
  }

  return response.data
}

export const logout = () => {
  localStorage.removeItem('accessToken');
}