"use server";

import { GET_AUTHENTICATED_USER } from "@/graphql/queries";
import { signIn, signOut } from "@/lib/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export const getAuthenticatedUser = async (accessToken: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_HASHNODE_GRAPHQL_API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },

    body: JSON.stringify({
      query: GET_AUTHENTICATED_USER,
      headers: {
        Authorization: accessToken,
      },
    }),
    cache: "no-store",
  });
  const data = await res.json();

  return data?.data?.me;
};

export const authenticate = async (
  _: string | undefined,
  formData: FormData
) => {
  try {
    if (!formData.get("accessToken")) return "Access token is required";
    await signIn("credentials", formData);
  } catch (error) {
    // Work around for NEXT_REDIRECT error
    if (isRedirectError(error)) {
      throw error;
    }

    return "Invalid access token";
  }
};

export const logout = async () => {
  try {
    await signOut({ redirect: true, redirectTo: "/" });
  } catch (error) {
    // Work around for NEXT_REDIRECT error
    if (isRedirectError(error)) {
      throw error;
    }
  }
};
