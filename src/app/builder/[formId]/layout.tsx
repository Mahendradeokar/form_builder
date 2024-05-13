"use client";

import styles from "./layout.module.css";
import Header from "@/screens/builder/components/Header";
import StoreProvider from "@/storeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StoreProvider>
        <div className="h-screen flex flex-col">
          <Header className="grow-0 shrink-0"/>
          <div className={styles.sidebarLayout}>{children}</div>
        </div>
      </StoreProvider>
    </>
  );
}
