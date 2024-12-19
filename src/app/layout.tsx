import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { ReactQueryClientProvider } from "@/components/react-query-client-provider";

const montserrat = localFont({
  src: [
    {
      path: "../fonts/Montserrat-Regular.ttf",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "../fonts/Montserrat-Italic.ttf",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Spot Cover",
  description:
    "Spot Cover is a minimalist web application that enhances your music listening experience by displaying the album cover of the currently playing track from Spotify in a sleek, full-screen format.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={`${montserrat.variable} antialiased`}>
          <main className="h-screen w-full flex items-center justify-center">
            {children}
          </main>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
