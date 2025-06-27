"use client";

import { Separator } from "@/components/ui/separator";
import Header from "@/screens/builder/components/Header";
import StoreProvider from "@/storeProvider";
import { useSearchParams } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview");

  const gridCols = isPreview ? "grid-cols-[1fr]" : "grid-cols-[1fr_3fr_1fr]";

  return (
    <>
      <StoreProvider>
        <div className="h-screen flex flex-col">
          <Header className="grow-0 shrink-0" />
          <Separator />
          <div className={`grid min-h-0 ${gridCols}`}>{children}</div>
        </div>
      </StoreProvider>
    </>
  );
}
