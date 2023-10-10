"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { showToast } from "../store/ToastStore";

import { useMutation } from "@tanstack/react-query";
import { shortenLink } from "../@core/services";
import { queryClient } from "./queryClient";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  editLink?: {
    id: number;
    shortUrl: string;
    url: string;
    visitCount: number;
  };
}

export default function UrlShortener({ editLink }: Props) {
  const [link, setLink] = useState(editLink?.url || "");
  const [code, setCode] = useState(editLink?.shortUrl || "");

  const { mutateAsync, isLoading, isError } = useMutation(shortenLink);

  const linkShortner = async () => {
    const response = await mutateAsync({
      url: link,
      code: encodeURI(code),
    });

    if (response?.shortUrl) {
      setLink("");
      setCode("");
      showToast({
        type: "default",
        title: "Sucesso!",
        description: "Link copiado para a área de transferência.",
      });
      navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_URL}${response.shortUrl}`
      );
      queryClient.invalidateQueries(["links"]);
    }
  };

  useEffect(() => {
    if (isError) {
      showToast({
        type: "destructive",
        title: "Erro!",
        description: "Ocorreu um erro ao encurtar o link.",
      });
    }
  }, [isError]);

  const isURL = () => {
    if (
      (link.includes("https://") || link.includes("http://")) &&
      code !== ""
    ) {
      return true;
    }
  };
  return (
    <div className="flex w-full justify-center">
      <Card className="w-full md:w-2/3 py-10 shadow-xl ">
        <CardContent>
          <section className="flex  flex-col  items-center  w-full  gap-4">
            <Input
              label="URL do Link"
              placeholder="https://go..."
              onChange={(event) => setLink(event.target.value)}
              value={link}
            />
            <div className=" flex flex-col md:flex-row gap-4 md:gap-8  w-full">
              <Input
                label="URL encurtada"
                value={`links.weme.com.br/${encodeURI(code)}`}
                disabled
              />
              <Input
                label="Código da URL encurtada"
                placeholder="Digite o código do link"
                onChange={(event) => setCode(event.target.value)}
                value={code}
              />
            </div>
            <Button
              variant="default"
              className="min-w-fit"
              onClick={linkShortner}
              disabled={!isURL()}
              loading={isLoading}
            >
              {editLink?.shortUrl ? "Editar" : "Encurtar"} link
            </Button>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
