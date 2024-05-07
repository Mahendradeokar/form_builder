import type { Metadata } from "next";
import styles from "./builder.module.css";
export const metadata: Metadata = {
  title: "Form Builder",
  description: "UI for creating dynamic forms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.sidebarLayout}>{children}</div>;
}
