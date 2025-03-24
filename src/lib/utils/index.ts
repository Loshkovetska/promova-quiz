import { ButtonVariantType } from "@/components/ui/button";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getButtonVariantById = (id: number) => {
  const BUTTON_VARIANTS: { [key in string]: ButtonVariantType } = {
    0: "primary",
    1: "success",
    2: "warn",
    3: "error",
    4: "default",
  };
  const totalCount = Object.keys(BUTTON_VARIANTS).length;
  const index = id >= totalCount ? totalCount - id : id;

  return BUTTON_VARIANTS[index];
};

export const getStrapiMediaUrl = (url: string) => {
  if (url.includes("http")) return url;

  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
};
