"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  link: {
    id: number;
    shortUrl: string;
    url: string;
    visitCount: number;
  };
}
export default function LinkItem({ link }: Props) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}${link.shortUrl}`
    );
  };
  return (
    <Card>
      <div className="p-2 flex justify-between gap-2 items-center">
        <div className="flex justify-between flex-grow flex-col ">
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
        <div
          className="min-w-[50px] flex justify-center gap-2 items-center cursor-pointer"
          onClick={copyToClipboard}
        >
          Copiar
          <Copy />
        </div>
      </div>
    </Card>
  );
}
