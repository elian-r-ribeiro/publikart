import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { PlayerProvider } from "@/context/PlayerContext";
import { LoadingProvider } from "@/context/LoadingContext";
import { MessageProvider } from "@/context/MessageContext";
import { DefaultSongProvider } from "@/context/DefaultSongContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PublikArt",
  description: "A plataforma de pequenos compositores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <DefaultSongProvider>
          <MessageProvider>
            <LoadingProvider>
              <UserProvider>
                <PlayerProvider>
                  {children}
                </PlayerProvider>
              </UserProvider>
            </LoadingProvider>
          </MessageProvider>
        </DefaultSongProvider>
      </body>
    </html >
  );
}
