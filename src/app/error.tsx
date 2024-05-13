"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body className="h-screen grid place-content-center">
        <div className="grid justify-center gap-3 w-[20rem]">
          <h2 className="text-xl">Something went wrong!</h2>
          <p className="text-center">{error.message}</p>
          <Button size={"lg"} onClick={() => reset()}>
            Try again
          </Button>
        </div>
      </body>
    </html>
  );
}
