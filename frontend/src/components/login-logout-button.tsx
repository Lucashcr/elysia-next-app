"use client";

import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";

export default function LoginLogoutButton() {
  const [cookies] = useCookies(["auth"]);

  const [title, setTitle] = useState("Entrar");
  const [href, setHref] = useState("/auth/login");

  useEffect(() => {
    if (cookies.auth?.accessToken) {
      setTitle("Sair");
      setHref("/auth/logout");
      return;
    }
    setTitle("Entrar");
    setHref("/auth/login");
  }, [cookies.auth?.accessToken]);

  return (
    <li>
      <a
        className="bg-zinc-600 py-2 px-4 rounded-full hover:bg-zinc-500 transition duration-[300ms]"
        href={href}
      >
        {title}
      </a>
    </li>
  );
}
