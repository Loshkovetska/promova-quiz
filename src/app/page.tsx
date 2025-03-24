import { getQuizStepByOrder } from "@/lib/actions/quizzes";
import { RedirectType, notFound, redirect } from "next/navigation";

export default async function Home() {
  const firstStep = await getQuizStepByOrder(1);

  if (!firstStep.data?.[0]) notFound();

  return redirect(
    `/quiz/${firstStep.data?.[0]?.documentId}`,
    RedirectType.replace
  );
}
