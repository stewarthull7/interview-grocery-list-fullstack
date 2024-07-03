import { kyClient } from "@utils/kyClient"

export const getGroceryList = async (params: { priority?: number; status?: string; perPage?: number }) => {
  const searchParams = new URLSearchParams(params as Record<string, string>)
  const response = await kyClient.get(`grocery`, { searchParams }).json<{ data: GroceryItem[] }>()

  return response.data
}

export const createGroceryItem = async (groceryItem: GroceryFormItem) => {
  const response = await kyClient.post(`grocery`, { json: groceryItem }).json<{ data: GroceryItem }>()

  return response.data
}
