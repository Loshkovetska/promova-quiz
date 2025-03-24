type InitialStateType = {
  quiz: { [key in string]: string[] | undefined };
  steps: string[];
};

export type { InitialStateType };
