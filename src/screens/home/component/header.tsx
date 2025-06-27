"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePageHeader() {
  return (
    <header className="flex items-center justify-between w-full max-w-screen-xl mx-auto p-2 sm:p-2 lg:p-4">
      <span className="text-base font-semibold">Form Builder</span>
      <Button size={"lg"}>
        <Link href="/builder/add">Create Form</Link>
      </Button>
    </header>
  );
}
