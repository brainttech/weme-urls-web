"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Copy } from "lucide-react";
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
    navigator.clipboard.writeText(`localhost:3000/${link.shortUrl}`);
  };
  return (
    <Card className="mt-4">
      <div className="p-2 flex justify-between gap-2">
        <div className="flex justify-between flex-grow">
          <p>{link.url}</p>
          <p>{link.visitCount}</p>
        </div>
        <div className="min-w-[50px] flex justify-center">
          <Copy className="cursor-pointer" onClick={copyToClipboard} />
        </div>
      </div>
    </Card>
  );
}
