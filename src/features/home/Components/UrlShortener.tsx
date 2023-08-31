"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { showToast } from "../store/ToastStore";
import { shortenLinkApplication } from "../@core/Application/Home.application";
import { useRouter } from "next/navigation";

export default function UrlShortener() {
  const [link, setLink] = useState("");
  const [code, setCode] = useState("");
  const router = useRouter();

  const linkShortner = async () => {
    const response = await shortenLinkApplication({ url: link, code });

    setLink("");
    setCode("");
    showToast({
      type: "default",
      title: "Sucesso!",
      description: "Link copiado para a área de transferência.",
    });
    router.refresh();
  };

  const isURL = () => {
    if (
      (link.includes("https://") || link.includes("http://")) &&
      code !== ""
    ) {
      return true;
    }
  };
  return (
    <section className="flex  flex-col items-center  w-full  gap-4">
      <Input
        placeholder="Cole seu link aqui"
        onChange={(event) => setLink(event.target.value)}
        value={link}
      />
      <Input
        placeholder="Digite o código do link"
        onChange={(event) => setCode(event.target.value)}
        value={code}
      />
      <Button
        variant="default"
        className="min-w-fit"
        onClick={linkShortner}
        disabled={!isURL()}
      >
        Encurtar link
      </Button>
    </section>
  );
}
