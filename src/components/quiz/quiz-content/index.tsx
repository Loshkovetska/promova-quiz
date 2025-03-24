import Button from "@/components/ui/button";
import { cn, getButtonVariantById, getStrapiMediaUrl } from "@/lib/utils";
import { StrapiQuizOptionType, StrapiQuizStepType } from "@/types/strapi.type";
import Image from "next/image";

type QuizContentPropType = {
  isSelected: (id: number) => boolean;
  onSelect: (option: StrapiQuizOptionType) => (e: React.MouseEvent) => void;
} & Pick<StrapiQuizStepType, "options" | "title" | "image">;

export default function QuizContent({
  options,
  title,
  image,
  isSelected,
  onSelect,
}: QuizContentPropType) {
  return (
    <div className="flex flex-col grow px-4 gap-6 pb-[100px] pt-4">
      <Image
        src={getStrapiMediaUrl(image.url)}
        alt={image.alternativeText || image.name || title}
        width={380}
        height={240}
        className="self-center max-md:w-full max-md:h-[58vw] rounded-2xl overflow-hidden h-[240px]"
        sizes="(min-width:768px) 44vw, 100vw"
        priority
        loading="eager"
      />
      <div className="flex flex-col gap-4 w-full grow">
        <h2 className="text-3xl text-center font-bold">{title}</h2>

        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5 w-full max-w-[680px] mx-auto grow">
          {options.map((option, id) => (
            <Button
              key={option.id}
              variant={getButtonVariantById(id)}
              className={cn("text-lg md:text-xl h-full", {
                selected: isSelected(option.id),
              })}
              onClick={onSelect(option)}
            >
              {option.title}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
