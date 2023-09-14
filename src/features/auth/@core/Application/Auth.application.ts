import { login, signup } from "../Gateway/Auth.gateway";
import { setCookie, deleteCookie } from "cookies-next";
import { useSignupStore } from "../../store/signupStore";
import { showToast } from "@/features/home/store/ToastStore";

export const signupApplication = async (values: any) => {
  const { setLoading } = useSignupStore.getState();

  try {
    const response = await signup(values);
    showToast({
      type: "default",
      title: "Sucesso!",
      description: "Cadastro realizado com sucesso!",
    });
    window.location.href = "/login";
    return response;
  } catch (error: any) {
    showToast({
      type: "destructive",
      title: "Erro",
      description: error?.message,
    });
  }
};

export const loginApplication = async (loginEntity: any) => {
  const { setLoading } = useSignupStore.getState();
  try {
    const response = await login(loginEntity);
    if (response.status !== 200) {
      console.log(response);
      throw new Error(response.token);
    }
    window.location.href = "/";

    setCookie("Wemely:Token", response.token, { maxAge: 60 * 60 * 24 });
    localStorage.setItem("Wemely:Token", response.token);
    showToast({
      type: "default",
      title: "Sucesso!",
      description: "Login realizado com sucesso!",
    });
    return response;
  } catch (error: any) {
    showToast({
      type: "destructive",
      title: "Erro",
      description: error?.message || "Tente novamente mais tarde",
    });
  }
};

export const logoutApplication = () => {
  deleteCookie("Wemely:Token");
  localStorage.removeItem("Wemely:Token");
  window.location.href = "/";
};
