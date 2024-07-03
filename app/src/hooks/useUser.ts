import { useQuery } from '@tanstack/react-query'

import { getMe } from '@services/user'

export const useUser = (enabled = true) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getMe(),
    enabled,
  })
}
