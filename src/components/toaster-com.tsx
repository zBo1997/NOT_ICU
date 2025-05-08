import { Toaster } from "@/components/ui/sonner";

import { ReactNode } from "react";

export const ToasterProvider = function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <main>{children}</main>
      <Toaster />
    </div>
  );
};
