"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Copy, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import { deleteLink } from "../services";
import { showToast } from "../store/ToastStore";
import { useRouter } from "next/navigation";

interface Props {
  link: {
    id: number;
    shortUrl: string;
    url: string;
    visitCount: number;
  };
}
export default function LinkItem({ link }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}${link.shortUrl}`
    );
  };

  const { mutateAsync: handleDelete } = useMutation(deleteLink, {
    onSuccess: () => {
      queryClient.invalidateQueries(["links"]);
      showToast({
        title: "Sucesso!",
        description: "Link deletado com sucesso.",
      });
    },
  });

  return (
    <Card>
      <div className="p-2 flex flex-col md:flex-row justify-between gap-2 items-start md:items-center ">
        <div className="flex  justify-between flex-grow flex-col ">
          <Button variant="ghost" className="w-fit p-0 text-md h-fit" asChild>
            <Link href={`/${link.shortUrl}`}>
              links.weme.com.br/{link.shortUrl}
            </Link>
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="truncate text-xs w-60 md:w-80">{link.url}</p>
              </TooltipTrigger>
              <TooltipContent side="top" align="start" className="w-fit">
                <p
                  style={{
                    wordBreak: "break-all",
                  }}
                >
                  {link.url}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p>Visitas: {link.visitCount}</p>
        </div>
        <div className="flex w-full md:w-auto justify-between md:gap-6">
          <div
            className="min-w-[50px] flex justify-center gap-2 items-center cursor-pointer"
            onClick={copyToClipboard}
          >
            <span className="hidden sm:inline-block">Copiar</span>
            <Copy />
          </div>
          <div
            className="min-w-[50px] flex justify-center gap-2 items-center cursor-pointer"
            onClick={() =>
              router.push("/user/edit?link=" + JSON.stringify(link))
            }
          >
            <span className="hidden sm:inline-block">Editar</span>
            <Pencil />
          </div>
          <div
            className="min-w-[50px] flex justify-center gap-2 items-center cursor-pointer"
            onClick={() => handleDelete(link?.id)}
          >
            <span className="hidden sm:inline-block">Excluir</span>
            <Trash />
          </div>
        </div>
      </div>
    </Card>
  );
}
