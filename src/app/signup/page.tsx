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
import { Input } from "@/components/ui/input";
import { signupApplication } from "@/features/auth/@core/Application/Auth.application";
import { signupSchema } from "@/features/auth/validationSchema";

import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Signup() {
  const router = useRouter();
  return (
    <main className="px-2 py-4 min-h-screen flex justify-center items-center">
      <Card className="w-full h-full ">
        <CardHeader>
          <CardTitle>Cadastro</CardTitle>
          <CardDescription>
            Crie sua conta para poder encurtar links
          </CardDescription>
        </CardHeader>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signupSchema}
          enableReinitialize
          validateOnMount
          onSubmit={(values) => {
            signupApplication(values);
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
                    error={touched.name && !!errors.name}
                    onBlur={() => setFieldTouched("name")}
                    helperText={(touched.name && errors.name) || ""}
                    label="Nome"
                    type="text"
                    onChange={(event) =>
                      setFieldValue("name", event.target.value)
                    }
                  />
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
                  <Input
                    error={touched.confirmPassword && !!errors.confirmPassword}
                    label="Confirme a senha"
                    type="password"
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                        ? "Senhas não são iguais"
                        : ""
                    }
                    onBlur={() => setFieldTouched("confirmPassword")}
                    onChange={(event) =>
                      setFieldValue("confirmPassword", event.target.value)
                    }
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href="/">Voltar</Link>
                  </Button>
                  <Button
                    disabled={Object.keys(errors).length > 0}
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Cadastrar
                  </Button>
                </CardFooter>
              </>
            );
          }}
        </Formik>
      </Card>
    </main>
  );
}
