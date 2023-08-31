import axios from "axios";
import { useLinksStore } from "../../store/linksStore";

export async function shortenLink(data: any) {
  const token = document.cookie.replace("Wemely:Token=", "");

  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API + "urls/shorten",
      {
        ...data,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    const linksResponse = await fetch(
      process.env.NEXT_PUBLIC_API + "users/me",
      {
        headers: { Authorization: "Bearer " + token },
        cache: "no-store",
      }
    );

    const linksData = await linksResponse.json();

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao encurtar URL");
  }
}
