import { Inter } from "next/font/google";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Popwola",
  description: "Your no-code popup builder!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <script src="https://cdn.popupsmart.com/bundle.js" data-id="843902" async defer></script>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
