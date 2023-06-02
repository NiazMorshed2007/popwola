import { Toast, ToastProvider } from "@/components/ui/toast";
import "./globals.scss";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Popwola",
  description: "Your only lead gen app for your business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <div>
        <Toaster />
      </div>
    </html>
  );
}
