"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Ternary from "./Ternary";
import { ArrowLeft } from "lucide-react";

interface GoBackProps {
  label?: string;
  className?: string;
  icon?: React.ReactNode | boolean;
}

const GoBack: React.FC<GoBackProps> = ({
  label = "Go Back",
  className = "",
  icon = true,
}) => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <Button
      variant={"link"}
      type="button"
      onClick={handleGoBack}
      aria-label={label}
      className={cn("space-x-2", className)}
    >
      <Ternary condition={Boolean(icon)}>
        <span aria-hidden="true">
          <Ternary
            condition={React.isValidElement(icon)}
            fallback={<ArrowLeft className="h-4 w-4" />}
          >
            {icon}
          </Ternary>
        </span>
      </Ternary>
      <span>{label}</span>
    </Button>
  );
};

export default GoBack;
