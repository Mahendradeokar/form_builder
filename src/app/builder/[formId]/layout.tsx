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
      <div className="h-screen">
        <StoreProvider>
          <Header />
          <div className={styles.sidebarLayout}>{children}</div>
        </StoreProvider>
      </div>
    </>
  );
}
