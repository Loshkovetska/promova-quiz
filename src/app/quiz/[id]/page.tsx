import Header from "@/components/header";
import Quiz from "@/components/quiz";
import { getQuizStepById, getQuizStepByOrder } from "@/lib/actions/quizzes";
import { StrapiQuizStepType } from "@/types/strapi.type";
import { RedirectType, notFound, redirect } from "next/navigation";

export const revalidate = 3600;

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ step: string }>;
}) {
  const ps = await params;
  const sparams = await searchParams;

  if (sparams.step) {
    const quizStep = await getQuizStepByOrder(Number(sparams.step));

    if (!quizStep.data?.[0]) notFound();

    return redirect(
      `/quiz/${quizStep.data?.[0].documentId}`,
      RedirectType.replace
    );
  }

  const response = await getQuizStepById(ps.id);

  if (!response?.data) return notFound();

  return (
    <>
      <Header stepsAmount={response.data.quiz.stepsAmount} />
      <Quiz {...(response.data as StrapiQuizStepType)} />;
    </>
  );
}
