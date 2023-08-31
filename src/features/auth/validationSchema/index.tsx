import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  name: Yup.string().required("Necessário"),
  email: Yup.string().email("Digite um e-mail válido").required("Necessário"),
  password: Yup.string()
    .required("Necessário")
    .matches(/[A-Z]/, "Senha deve ter no mínimo uma letra maiúscula")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Senha deve ter no mínimo um caracter especial"
    )
    .matches(/[0-9]/, "Senha deve conter no mínimo um número")
    .min(8, "Senha deve ter no mínimo 8 caracteres"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), "Senhas não são iguais"])
    .required("Confirmação de senha é necessária"),
});
export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Digite um e-mail válido").required("Necessário"),
  password: Yup.string()
    .required("Necessário")
    .matches(/[A-Z]/, "Senha deve ter no mínimo uma letra maiúscula")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Senha deve ter no mínimo um caracter especial"
    )
    .matches(/[0-9]/, "Senha deve conter no mínimo um número")
    .min(8, "Senha deve ter no mínimo 8 caracteres"),
});
