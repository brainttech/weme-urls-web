"use client";

import { Button } from "@/components/ui/button";
import { logoutApplication } from "@/features/auth/@core/Application/Auth.application";
import Image from "next/image";
import React from "react";

export default function LoggedHeader({ name }: { name: string }) {
  return (
    <nav className="w-full flex mt-4 px-10 items-center justify-between ">
      <Image
        src="https://uploads-ssl.webflow.com/64777a8d9e690fab7ae929ff/649bd8ed4b3a895b4e593264_Group%2083.svg"
        width={500}
        height={300}
        className="w-24"
        alt="weme logo"
      />
      {/* <p className="text-2xl">Olá, {name}</p> */}
      <Button variant={"ghost"} onClick={logoutApplication} className="text-xl">
        Sair
      </Button>
    </nav>
  );
}
