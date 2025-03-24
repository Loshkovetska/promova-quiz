type StrapiResponseType<T> = {
  data: T;
};

type StrapiDocumentType = {
  id: number;
  documentId: string;
};

type StrapiQuizType = {
  order: number;
} & StrapiDocumentType;

type StrapiMediaType = {
  name: string;
  alternativeText: string | null;
  url: string;
  previewUrl: string | null;
} & StrapiDocumentType;

type StrapiQuizOptionType = {
  title: string;
  next_step: StrapiQuizType | null;
} & StrapiDocumentType;

type StrapiQuizStepType = {
  title: string;
  multiple: boolean;
  options: StrapiQuizOptionType[];
  image: StrapiMediaType;
  right_answers: string[];
  quiz: { stepsAmount: number } & StrapiDocumentType;
  next: StrapiQuizType | null;
  order: number;
} & StrapiDocumentType;

type StrapiQuizStepOrderResponseType = StrapiResponseType<StrapiQuizType[]>;
type StrapiQuizStepResponseType = StrapiResponseType<StrapiQuizStepType>;

export type {
  StrapiQuizOptionType,
  StrapiQuizStepOrderResponseType,
  StrapiQuizStepResponseType,
  StrapiQuizStepType,
};
