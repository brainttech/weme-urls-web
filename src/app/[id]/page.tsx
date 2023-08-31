"use client";

import { useEffect } from "react";
import Lottie from "lottie-react";
import octopus from "./octopus.json";

export default function Redirecter({ params }: { params: { id: string } }) {
  useEffect(() => {
    window.location.href =
      process.env.NEXT_PUBLIC_API + "urls/open/" + params.id;
  });

  return (
    <main className="h-screen flex items-center">
      <Lottie animationData={octopus} loop={true} />
    </main>
  );
}
