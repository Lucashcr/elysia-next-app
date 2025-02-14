"use client";

import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

import { handleLoginFormSubmit } from "@/helpers/actions";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const [, setCookie] = useCookies(["auth"]);

  async function validateLoginFormSubmit(formData: FormData) {
    const accessToken = await handleLoginFormSubmit(formData);
  
    if (!accessToken) {
      toast.error("Falha ao tentar fazer o login");
      return;
    }
  
    setCookie("auth", { accessToken }, { path: "/" });
    toast.success("Login efetuado com sucesso");
    redirect("/")
  }

  return (
    <div className="grow flex items-center">
      <form
        action={validateLoginFormSubmit}
        className="flex flex-col gap-3 p-6 bg-zinc-800 rounded-xl"
      >
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Usuário"
          className="rounded p-1 text-zinc-800"
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Senha"
          className="rounded p-1 text-zinc-800"
        />
        <input
          type="submit"
          value="Entrar"
          className="bg-zinc-700 rounded-lg py-1"
        />
      </form>
    </div>
  );
}
