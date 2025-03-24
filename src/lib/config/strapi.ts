import { strapi } from "@strapi/client";

export default function strapiClient() {
  const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const authToken = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

  if (!baseURL) throw new Error("Can't find NEXT_PUBLIC_STRAPI_API_URL");
  if (!authToken) throw new Error("Can't find NEXT_PUBLIC_STRAPI_TOKEN");
  return strapi({
    baseURL: `${baseURL}/api`,
    auth: authToken,
  });
}
