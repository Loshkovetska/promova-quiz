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

export const getQuizSteps = (
  steps: string[],
  currentStep: string,
  prevStep?: string
) => {
  let result;
  const index = steps.indexOf(currentStep);
  if (index !== -1) {
    result = steps.filter((_, id) => id <= index);

    if (prevStep) {
      const prevIndex = steps.indexOf(prevStep);
      result = result.filter((_, id) => id > prevIndex);
    }
  }

  if (index === -1) {
    result = [...steps, currentStep];
  }

  return result || [];
};

export const sortAndJoinStringArray = (arr: string[]) =>
  JSON.parse(JSON.stringify(arr))
    .sort((a: string, b: string) => a.localeCompare(b))
    .join(",");

export const compareTwoArrays = (arr1: string[], arr2: string[]) => {
  return sortAndJoinStringArray(arr1) !== sortAndJoinStringArray(arr2);
};
