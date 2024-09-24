"use client";
import localFont from "next/font/local";
import { ReactQueryClientProvider } from "@/components/reactQueryProvider";
import { CartProvider } from "@/context/cartContext";
import { FilterProvider } from "@/context/filterContext";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProvider>
      <CartProvider>
        <FilterProvider>
          <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
              {children}
            </body>
          </html>
        </FilterProvider>
      </CartProvider>
    </ReactQueryClientProvider>
  );
}
