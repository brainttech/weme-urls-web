"use client";

import { Button } from "@/components/ui/button";
import { logoutApplication } from "@/features/auth/@core/Application/Auth.application";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoggedHeader() {
  const router = useRouter();
  return (
    <nav className="w-full flex mb-4 px-10 py-6 items-center justify-between shadow-lg">
      <Image
        src="https://uploads-ssl.webflow.com/64777a8d9e690fab7ae929ff/649bd8ed4b3a895b4e593264_Group%2083.svg"
        width={500}
        height={300}
        className="w-24"
        alt="weme logo"
      />
      <div>
        <Button
          variant={"ghost"}
          onClick={() => router.push("/user/shorten")}
          className="text-xl"
        >
          Encurtar link
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => router.push("/user/links")}
          className="text-xl"
        >
          Meus links
        </Button>

        <Button
          variant={"ghost"}
          onClick={logoutApplication}
          className="text-xl"
        >
          Sair
        </Button>
      </div>
    </nav>
  );
}
