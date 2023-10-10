"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const token = localStorage.getItem("Wemely:Token");

  if (token) {
    return router.push("/user/shorten");
  }

  router.push("/login");

  return <></>;
}
