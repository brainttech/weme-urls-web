import { api } from "@/services/api";

export async function deleteLink(id: number) {
  const response = await api.delete("/urls/" + id);

  return response.data;
}
