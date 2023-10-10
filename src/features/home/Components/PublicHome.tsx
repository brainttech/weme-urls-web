import React from "react";
import Image from "next/image";

export default function PublicHome() {
  return (
    <main className="flex flex-col min-h-screen items-center px-10">
      <div className="flex justify-between items-center w-full  mt-4 ">
        <Image
          src="https://uploads-ssl.webflow.com/64777a8d9e690fab7ae929ff/649bd8ed4b3a895b4e593264_Group%2083.svg"
          width={500}
          height={300}
          className="w-24"
          alt="weme logo"
        />
        {/* <nav className="w-full flex justify-end items-center">
          <Button variant={"ghost"} asChild>
            <Link href="/login">Entrar</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/signup">Cadastre-se</Link>
          </Button>
        </nav> */}
      </div>

      <section className="flex flex-col justify-center max-w-6xl w-full flex-grow ">
        <p className=" text-xl text-center">
          Entre na sua conta para poder encurtar links!
        </p>
      </section>
    </main>
  );
}
