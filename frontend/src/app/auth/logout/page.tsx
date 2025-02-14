"use client";

import { redirect } from "next/navigation";
import { useCookies } from "react-cookie";

export default function LogoutPage() {
  const [, , removeCookie] = useCookies(["auth"]);

  function validateLogoutFormSubmit() {
    removeCookie("auth", { path: "/" });
    redirect("/auth/login");
  }

  return (
    <div className="grow flex items-center">
      <form
        action={validateLogoutFormSubmit}
        className="flex flex-col gap-3 p-6 bg-zinc-800 rounded-xl"
      >
        <h2>Tem certeza que deseja sair?</h2>
        <input
          type="submit"
          value="Sair"
          className="bg-zinc-700 rounded-lg py-1"
        />
      </form>
    </div>
  );
}
