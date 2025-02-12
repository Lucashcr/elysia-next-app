import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";

import { env } from "bun";

const app = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: env.JWT_SECRET_KEY ?? "secret-key",
    })
  )
  .post("/login", async ({ jwt, cookie: { auth }, body, set }) => {
    if (
      !body ||
      typeof body !== "object" ||
      !("username" in body) ||
      !("password" in body)
    ) {
      set.status = 400;
      return JSON.stringify({ detail: "Invalid data" });
    }

    auth.set({
      value: await jwt.sign(body as Record<string, string>),
      httpOnly: true,
      maxAge: 7 * 86400,
      path: `${env.FRONTEND_BASE_DOMAIN}`,
    });

    set.status = 200;
    return JSON.stringify({ access: auth.value });
  })
  .get("/", async ({ jwt, set, cookie: { auth } }) => {
    const profile = await jwt.verify(auth.value);

    if (!profile) {
      set.status = 401;
      return JSON.stringify({ detail: "Unauthorized" });
    }

    return JSON.stringify(profile);
  })
  .post("/logout", async ({ cookie: { auth } }) => {
    auth.remove();
    return JSON.stringify({ detail: "Logged out successfully" });
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
