import { useLinksStore } from "../../store/linksStore";
import { shortenLink } from "../Gateway/Home.gateway";

import { showToast } from "@/features/home/store/ToastStore";

export const shortenLinkApplication = async (values: any) => {
  try {
    const response = await shortenLink(values);
    showToast({
      type: "default",
      title: "Sucesso!",
      description: "Link encurtado com sucesso!",
    });

    return response;
  } catch (error: any) {
    showToast({
      type: "destructive",
      title: "Erro",
      description: error?.message,
    });
  }
};
