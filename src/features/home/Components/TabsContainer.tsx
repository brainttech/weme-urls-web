"use client";

import React from "react";
import UrlShortener from "./UrlShortener";
import LinkItem from "./LinkItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TabsContainer({ links }: { links: any[] }) {
  return (
    <section className="w-full flex justify-center">
      <Tabs defaultValue="shorten" className="w-full  max-w-[600px]">
        <TabsList className="grid w-full grid-cols-2 gap-4">
          <TabsTrigger value="shorten">Encurtar links</TabsTrigger>
          <TabsTrigger value="links">Lista de links</TabsTrigger>
        </TabsList>
        <TabsContent value="shorten">
          <UrlShortener />
        </TabsContent>
        <TabsContent value="links">
          <ScrollArea className="h-72 w-full  rounded-md border ">
            <div className="flex flex-col gap-4 m-4">
              {links?.map((link: any) => (
                <LinkItem key={link.id} link={link} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </section>
  );
}
