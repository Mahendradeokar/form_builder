import * as React from "react";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Loader = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "flex h-w w-full rounded-md bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 justify-center align-middle",
        className
      )}
      {...props}
    >
      <Loader2 className="mr-2 h-24 w-24 animate-spin" />{" "}
    </div>
  );
};

export default Loader;
