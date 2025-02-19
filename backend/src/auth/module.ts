import { env } from "bun";

import Elysia, { t } from "elysia";
import jwt from "@elysiajs/jwt";

const AuthModule = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: env.JWT_SECRET_KEY ?? "secret-key",
    })
  )
  .post(
    "/login",
    async ({ jwt, cookie: { auth }, body, set }) => {
      const token = await jwt.sign(body);

      auth.set({
        value: token,
        httpOnly: true,
        maxAge: 7 * 86400,
        path: `${env.FRONTEND_BASE_DOMAIN}`,
      });

      set.status = 200;
      return { access: auth.value };
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    }
  )
  .get("/", async ({ jwt, set, cookie: { auth } }) => {
    const profile = await jwt.verify(auth.value);

    if (!profile) {
      set.status = 401;
      return { detail: "Unauthorized" };
    }

    return profile;
  })
  .post("/logout", async ({ cookie: { auth } }) => {
    auth.remove();
    return { detail: "Logged out successfully" };
  });

export default AuthModule;
