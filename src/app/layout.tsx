import Providers from "@/components/providers";
import { GoogleAnalytics } from "@next/third-parties/google";
import { type Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const openSans = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Promova Quiz",
  description: "Choose the right answer",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} antialiased`}>
        <Providers>{children}</Providers>
        <GoogleAnalytics gaId="G-XYZ" />
      </body>
    </html>
  );
}
