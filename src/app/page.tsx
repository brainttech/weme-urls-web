import { Button } from "@/components/ui/button";
import LinkItem from "@/features/home/Components/LinkItem";
import UrlShortener from "@/features/home/Components/UrlShortener";
import Link from "next/link";
import { Suspense } from "react";
import { cookies } from "next/headers";
import LoggedHeader from "@/features/home/Components/LoggedHeader";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import TabsContainer from "@/features/home/Components/TabsContainer";

export default async function Home() {
  const token = cookies().get("Wemely:Token");

  let name = "";
  let links = [];

  if (token) {
    const response = await fetch(process.env.NEXT_PUBLIC_API + "users/me", {
      headers: { Authorization: "Bearer " + token.value },
      cache: "no-store",
    });

    const data = await response.json();
    name = data.name;
    links = data.shortenedUrls;
  }

  return (
    <main className="flex flex-col min-h-screen items-center px-10">
      {token ? (
        <LoggedHeader name={name} />
      ) : (
        <nav className="w-full flex justify-end mt-4 ">
          <Button variant={"ghost"} asChild>
            <Link href="/login">Entrar</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/signup">Cadastre-se</Link>
          </Button>
        </nav>
      )}

      <section className="flex flex-col justify-center max-w-6xl w-full flex-grow ">
        <Suspense>
          {/* <UrlShortener /> */}
          <TabsContainer links={links} />
        </Suspense>
      </section>
    </main>
  );
}
