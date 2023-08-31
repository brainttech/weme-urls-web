"use client";

import { useEffect } from "react";
import Lottie from "lottie-react";
import octopus from "./octopus.json";

export default function Redirecter({ params }: { params: { id: string } }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: octopus,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    window.location.href =
      process.env.NEXT_PUBLIC_API + "urls/open/" + params.id;
  });

  return <Lottie animationData={octopus} loop={true} />;
}
