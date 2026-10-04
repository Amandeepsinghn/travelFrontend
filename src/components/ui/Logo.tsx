import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  alt?: string;
};

export function Logo({ className, alt = "Trail Panda" }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/icons/panda.png"
      alt={alt}
      className={cn("h-14 w-auto object-contain", className)}
    />
  );
}
