"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePageHeader() {
  return (
    <header className="p-3 flex flex-wrap justify-between">
      <Link href={"/"}>
        <h1 className="text-xl font-bold">Form Builder</h1>
      </Link>
      <div className="flex justify-end flex-wrap gap-4 px-5">
        <div className="flex items-center gap-1">
          {/* <Link href="/signup">
            <Button size={"lg"}>SignUp</Button>
          </Link>
          <Link href="/login">
            <Button size={"lg"}>Login</Button>
          </Link> */}
          <Link href="/builder/add">
            <Button size={"lg"}>Create Form</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
