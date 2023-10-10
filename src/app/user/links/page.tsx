/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Button } from "@/components/ui/button";
import { getLinks } from "@/features/home/@core/services";
import LinkItem from "@/features/home/Components/LinkItem";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  const { data, isLoading, isError } = useQuery(["links"], getLinks);

  return (
    <div className="flex flex-col gap-4 m-4">
      {isLoading ? (
        <div className="w-full  flex justify-center items-center mt-10">
          <Loader2 className="mr-2 h-20 w-20 animate-spin" />
        </div>
      ) : (
        <>
          {data?.shortenedUrls?.length > 0 ? (
            data?.shortenedUrls?.map((link: any) => (
              <LinkItem key={link.id} link={link} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold">Nenhum link encurtado</p>
              <Link href="/user/shorten">
                <Button variant={"link"} className="text-xl">
                  Encurte um link agora mesmo!
                </Button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
