import QuizResult from "@/components/quiz-result";
import { getQuizAnswers } from "@/lib/actions/quizzes";

export default async function Page() {
  const results = await getQuizAnswers();
  return <QuizResult {...results} />;
}
