"use client";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useEffect } from "react";
import { useToastStore } from "../store/ToastStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { GoogleOAuthProvider } from "@react-oauth/google";

interface Props {
  children: React.ReactNode;
}

export default function UseClient({ children }: Props) {
  const { toast } = useToast();
  const { message, hideToast } = useToastStore((state) => {
    return {
      message: state.message,
      hideToast: state.hideToast,
    };
  });

  useEffect(() => {
    if (message) {
      toast({
        title: message.title,
        description: message.description,
        variant: message.type,
      });
    }
  }, [message, toast, hideToast]);
  return (
    <GoogleOAuthProvider clientId="667527368000-ef2lt1ago3r9fo148pt9852859gtcil8.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <Toaster />

        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}
