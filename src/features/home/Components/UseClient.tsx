"use client";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

import React, { useEffect } from "react";
import { useToastStore } from "../store/ToastStore";

export default function UseClient() {
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
    <>
      <Toaster />
    </>
  );
}
