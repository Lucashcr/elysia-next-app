import { Elysia } from "elysia";


import AuthModule from "@/auth/module";

const app = new Elysia()
  .use(AuthModule)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
