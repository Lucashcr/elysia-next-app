"use server";

import { BACKEND_BASE_DOMAIN } from "@/helpers/constants";

export async function handleLoginFormSubmit(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  let response;
  try {
    response = await fetch(`${BACKEND_BASE_DOMAIN}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return null;
  }

  if (response.ok) {
    const responseData = await response.json();
    return responseData.access;
  }

  return null;
}