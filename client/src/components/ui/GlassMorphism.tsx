import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassMorphismProps {
  children: ReactNode;
  className?: string;
  intensity?: "light" | "medium" | "heavy";
}

export const GlassMorphism = ({
  children,
  className,
  intensity = "medium",
}: GlassMorphismProps) => {
  // Define backdrop filter based on intensity
  const backdropIntensity = {
    light: "backdrop-blur-sm bg-white/40",
    medium: "backdrop-blur-md bg-white/60",
    heavy: "backdrop-blur-lg bg-white/80",
  };

  return (
    <div
      className={cn(
        backdropIntensity[intensity],
        "border border-white/20 rounded-lg",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassMorphism;
