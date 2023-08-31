import { Button } from "@/components/ui/button";

import Link from "next/link";
import { Suspense } from "react";
import { cookies } from "next/headers";
import LoggedHeader from "@/features/home/Components/LoggedHeader";
import TabsContainer from "@/features/home/Components/TabsContainer";
import Image from "next/image";

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
        <div className="flex justify-between items-center w-full  mt-4 ">
          <Image
            src="https://uploads-ssl.webflow.com/64777a8d9e690fab7ae929ff/649bd8ed4b3a895b4e593264_Group%2083.svg"
            width={500}
            height={300}
            className="w-24"
            alt="weme logo"
          />
          <nav className="w-full flex justify-end items-center">
            <Button variant={"ghost"} asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/signup">Cadastre-se</Link>
            </Button>
          </nav>
        </div>
      )}

      <section className="flex flex-col justify-center max-w-6xl w-full flex-grow ">
        {!token ? (
          <p className=" text-xl text-center">
            Entre na sua conta para poder encurtar links!
          </p>
        ) : (
          <Suspense>
            {/* <UrlShortener /> */}
            <TabsContainer links={links} />
          </Suspense>
        )}
      </section>
    </main>
  );
}
