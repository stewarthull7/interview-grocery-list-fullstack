import { kyClient } from "@utils/kyClient"

export const getMe = async () => {
  const response = await kyClient.get(`user/me`).json<{ data: User }>()

  return response.data
}