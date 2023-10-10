import React, { useEffect } from "react";
import LoggedHeader from "./LoggedHeader";
import TabsContainer from "./TabsContainer";
import { useQuery } from "@tanstack/react-query";
import { getLinks } from "../@core/services";
import { showToast } from "../store/ToastStore";

export default function LoggedHome() {
  const { data, isLoading, isError } = useQuery(["links"], getLinks);

  useEffect(() => {
    if (isError) {
      showToast({
        type: "destructive",
        title: "Erro!",
        description: "Erro ao buscar links.",
      });
    }
  }, [isError]);

  return (
    <main className="flex flex-col min-h-screen items-center px-10">
      <LoggedHeader />

      <section className="flex flex-col justify-center max-w-6xl w-full flex-grow ">
        <TabsContainer links={data?.shortenedUrls} loading={isLoading} />
      </section>
    </main>
  );
}
