"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { login, socialLogin } from "@/features/auth/services";
import { loginSchema } from "@/features/auth/validationSchema";
import { useMutation } from "@tanstack/react-query";
import jwt_decode from "jwt-decode";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { showToast } from "@/features/home/store/ToastStore";

export default function Signup() {
  const { toast } = useToast();
  const router = useRouter();
  const { mutateAsync, isLoading } = useMutation(login, {
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { mutateAsync: googleLogin, isLoading: googleLoading } = useMutation(
    socialLogin,
    {
      onSuccess: (response: any) => {
        router.push("/user/shorten");
      },
    }
  );

  const responseMessage = (response: any) => {
    const token: { email: string; name: string } = jwt_decode(
      response.credential
    );
    googleLogin({
      email: token.email,
      name: token.name,
    });
  };
  const errorMessage = (error: any) => {
    console.log(error);
  };

  return (
    <main className="flex flex-col px-4 py-4">
      <div className="flex justify-between items-center w-full  mt-4 ">
        <Image
          src="https://uploads-ssl.webflow.com/64777a8d9e690fab7ae929ff/649bd8ed4b3a895b4e593264_Group%2083.svg"
          width={500}
          height={300}
          className="w-24"
          alt="weme logo"
        />
      </div>
      <section className=" min-h-screen flex flex-col justify-center items-center ">
        <Card className="md:min-w-[500px]  max-w-[800px] h-full ">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Entre na sua conta para poder encurtar links
            </CardDescription>
          </CardHeader>
          <div className="flex justify-center w-full">
            <GoogleLogin
              width={250}
              onSuccess={responseMessage}
              onError={() => {
                showToast({
                  title: "Erro",
                  description: "Erro ao logar com o google",
                  type: "destructive",
                });
              }}
            />
          </div>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            enableReinitialize
            validateOnMount
            onSubmit={async (values) => {
              const response = await mutateAsync(values);
              if (response) {
                router.push("/");
              }
            }}
          >
            {({
              setFieldValue,
              handleSubmit,
              errors,
              touched,
              setFieldTouched,
            }) => {
              return (
                <>
                  <CardContent className="flex flex-col gap-4">
                    <Input
                      error={touched.email && !!errors.email}
                      label="E-mail"
                      type="email"
                      onBlur={() => setFieldTouched("email")}
                      helperText={(touched.email && errors.email) || ""}
                      onChange={(event) =>
                        setFieldValue("email", event.target.value)
                      }
                    />
                    <Input
                      error={touched.password && !!errors.password}
                      label="Senha"
                      type="password"
                      helperText={(touched.password && errors.password) || ""}
                      onBlur={() => setFieldTouched("password")}
                      onChange={(event) =>
                        setFieldValue("password", event.target.value)
                      }
                    />
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button
                      disabled={Object.keys(errors).length > 0}
                      onClick={() => {
                        handleSubmit();
                      }}
                      loading={isLoading}
                    >
                      Entrar
                    </Button>
                  </CardFooter>
                  <CardFooter className="flex justify-end">
                    <p>
                      Ainda não possui conta?
                      <Button variant="link">
                        <Link href="/signup">Cadastre-se</Link>
                      </Button>
                    </p>
                  </CardFooter>
                </>
              );
            }}
          </Formik>
        </Card>
      </section>
    </main>
  );
}
