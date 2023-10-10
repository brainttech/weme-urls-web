import { api } from "@/services/api";
import { AxiosError } from "axios";
import { ISignupEntity } from "../@core/Entities/signup.entity";
import { setCookie } from "cookies-next";

export async function signup(data: ISignupEntity) {
  const response = await api.post("/signup", data);
  return response.data;
}

export async function login(data: { email: string; password: string }) {
  try {
    const response = await api.post("/signin", data);

    localStorage.setItem("Wemely:Token", response.data);
    setCookie("Wemely:Token", response.data, { maxAge: 60 * 60 * 24 });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}
export async function socialLogin(data: { email: string; name: string }) {
  const response = await api.post("/socialLogin", data);

  localStorage.setItem("Wemely:Token", response.data);
  setCookie("Wemely:Token", response.data, { maxAge: 60 * 60 * 24 });

  return response.data;
}
