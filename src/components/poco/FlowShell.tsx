import type { ReactNode } from "react";
import { Header, Footer } from "./Header";
import { ProgressBar } from "./Steps";

export function FlowShell({
  steps,
  current,
  children,
  wide = false,
}: {
  steps: { label: { en: string; ko: string } }[];
  current: number;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="min-h-screen">
      <Header back />
      <div className="mx-auto max-w-3xl px-4 pt-5 sm:px-6">
        <ProgressBar steps={steps} current={current} />
      </div>
      <main className={`mx-auto ${wide ? "max-w-4xl" : "max-w-3xl"} px-4 py-8 sm:px-6`}>{children}</main>
      <Footer />
    </div>
  );
}
