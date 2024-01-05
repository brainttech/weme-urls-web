import { api } from "@/services/api";

export async function shortenLink(data: any) {
  const response = await api.post("/urls/shorten", {
    ...data,
  });

  return response.data;
}

export async function handleEditLink(data: any) {
  const response = await api.put("/urls/"+ data?.id, {
    "code":data?.code,
	  "url":data?.url
  });

  return response.data;
}



export async function getLinks() {
  const response = await api.get("/users/me");
  return response.data;
}
