import UrlShortener from "@/features/home/Components/UrlShortener";
import React from "react";

export default function page({ searchParams }: any) {
  const link = JSON.parse(searchParams?.link);
  return <UrlShortener editLink={link} />;
}
