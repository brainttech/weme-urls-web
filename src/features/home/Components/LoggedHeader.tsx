"use client";

import { Button } from "@/components/ui/button";
import { logoutApplication } from "@/features/auth/@core/Application/Auth.application";
import React from "react";

export default function LoggedHeader({ name }: { name: string }) {
  return (
    <nav className="w-full flex mt-4 px-10 items-center justify-between">
      <p className="text-2xl">Olá, {name}</p>
      <Button variant={"ghost"} onClick={logoutApplication} className="text-xl">
        Sair
      </Button>
    </nav>
  );
}
