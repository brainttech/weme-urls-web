import { useSignupStore } from "@/features/auth/store/signupStore";
import axios from "axios";
import { cookies } from "next/headers";

const URL = "localhost:8080/";
const { setLoading } = useSignupStore.getState();

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  },
});

api.interceptors.request.use(async (config: any) => {
  const token = localStorage.getItem("Wemely:Token");

  setLoading(true);

  if (token) config.headers.Authorization = "Bearer " + token;
  return config;
});

api.interceptors.response.use(
  (response) => {
    setLoading(false);
    return response;
  },
  async function (error) {
    setLoading(false);

    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // cookies().delete("Wemely:Token");
      localStorage.removeItem("Wemely:Token");

      // const { token, refreshToken } = await getRefreshToken().catch(
      //   () => (window.location.href = "/login")
      // );

      // localStorage.setItem("token", token);
      // localStorage.setItem("refreshToken", refreshToken);

      // api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

// const getRefreshToken = async () => {
//   try {
//     const resp = await api.post(
//       "user/v0_1/reauth",
//       {},
//       {
//         headers: {
//           Refresh: `Bearer ${localStorage.getItem("refreshToken")}`,
//         },
//       }
//     );

//     console.log("Reautenticando pelo interceptor");

//     return resp?.data?.response;
//   } catch (e) {
//     console.log("Error", e);
//   }
// };
