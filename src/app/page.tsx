"use client";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import { Suspense, useEffect } from "react";
import TabsContainer from "@/features/home/Components/TabsContainer";
import { useQuery } from "@tanstack/react-query";
import { getLinks } from "@/features/home/@core/services";
import { showToast } from "@/features/home/store/ToastStore";
import PublicHome from "@/features/home/Components/PublicHome";
import LoggedHome from "@/features/home/Components/LoggedHome";

export default function Home() {
  const token = localStorage.getItem("Wemely:Token");

  if (token) {
    return <LoggedHome />;
  }

  return <PublicHome />;
}
