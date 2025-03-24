"use server";
import strapiClient from "@/lib/config/strapi";
import { QuizResultType } from "@/types";
import {
  StrapiQuizStepOrderResponseType,
  StrapiQuizStepResponseType,
} from "@/types/strapi.type";

export async function getQuizStepByOrder(
  order: number
): Promise<StrapiQuizStepOrderResponseType> {
  return (await strapiClient()
    .collection("quiz-steps")
    .find({
      fields: ["order"],
      pagination: { limit: 1 },
      filters: {
        quiz: {
          documentId: {
            $eq: process.env.NEXT_PUBLIC_QUIZ_ID || "",
          },
        },
        order: {
          $eq: order,
        },
      },
    })) as unknown as StrapiQuizStepOrderResponseType;
}

export async function getQuizStepById(
  id: string
): Promise<StrapiQuizStepResponseType> {
  return (await strapiClient()
    .collection("quiz-steps")
    .findOne(id, {
      populate: {
        options: {
          fields: ["title"],
          populate: {
            next_step: {
              fields: ["order"],
            },
          },
        },
        quiz: {
          fields: ["stepsAmount"],
        },
        next: {
          fields: ["order"],
        },
        image: {
          fields: ["url", "alternativeText", "previewUrl", "name"],
        },
      },
    })) as unknown as StrapiQuizStepResponseType;
}

export async function getQuizAnswers(): Promise<QuizResultType> {
  const response = await strapiClient()
    .collection("quiz-steps")
    .find({
      fields: ["right_answers", "title"],
      filters: {
        quiz: {
          documentId: {
            $eq: process.env.NEXT_PUBLIC_QUIZ_ID || "",
          },
        },
      },
    });

  const result: QuizResultType = {
    right_anwers: {},
    data: {},
  };

  response.data.forEach((doc) => {
    result.right_anwers[doc.documentId] = doc.right_answers;
    result.data[doc.documentId] = doc.title;
  });

  return result;
}
