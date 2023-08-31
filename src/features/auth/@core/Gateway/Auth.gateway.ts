import { ISignupEntity } from "../Entities/signup.entity";
import axios, { AxiosError } from "axios";

export async function signup(data: ISignupEntity) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API + "signup",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError<any>;
    throw new Error(
      err.response?.data?.message?.message || "Erro desconhecido"
    );
  }
}

export async function login(data: { email: string; password: string }) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API + "signin",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      status: response.status,
      token: response.data,
    };
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}
