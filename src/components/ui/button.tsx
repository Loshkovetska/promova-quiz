import { cn } from "@/lib/utils";

export type ButtonVariantType =
  | "default"
  | "warn"
  | "error"
  | "primary"
  | "success"
  | "disabled";

type ButtonPropType = {
  variant?: ButtonVariantType;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variants: { [key in ButtonVariantType]: string } = {
  default: "bg-confirm hover:bg-confirm/70 [&.selected]:bg-confirm/50",
  disabled: "bg-confirm/40",
  primary: "bg-primary hover:bg-primary/70 [&.selected]:bg-primary/50",
  warn: "bg-warn hover:bg-warn/70 [&.selected]:bg-warn/50",
  error: "bg-error hover:bg-error/70 [&.selected]:bg-error/50",
  success: "bg-success hover:bg-success/70 [&.selected]:bg-success/50",
};

export default function Button({
  variant = "default",
  ...props
}: ButtonPropType) {
  return (
    <button
      {...props}
      className={cn(
        "px-4 py-3 rounded-xl cursor-pointer text-white text-lg transition-all font-semibold inset-shadow-[0_-5px_1px_rgba(0,0,0,0.25)]",
        props.className,
        variants[props.disabled ? "disabled" : variant]
      )}
    />
  );
}
