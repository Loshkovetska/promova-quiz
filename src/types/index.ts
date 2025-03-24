type InitialStateType = {
  quiz: { [key in string]: string[] | undefined };
  steps: string[];
};

type QuizResultType = {
  right_anwers: Record<string, string[]>;
  data: Record<string, string[]>;
};

export type { InitialStateType, QuizResultType };
