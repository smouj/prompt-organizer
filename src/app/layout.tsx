import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Prompt Organizer - Organiza tus prompts, auditorías y backlog técnico",
    template: "%s | Prompt Organizer",
  },
  description: "Herramienta visual para organizar prompts, auditorías, bugs y backlog técnico. Gestiona plantillas, tareas y genera prompts profesionales.",
  keywords: [
    "prompt organizer",
    "prompts",
    "IA",
    "inteligencia artificial",
    "auditoría",
    "bugs",
    "backlog",
    "gestión de tareas",
    "nextjs",
    "typescript",
  ],
  authors: [{ name: "smouj" }],
  creator: "smouj",
  publisher: "smouj",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
    shortcut: "/favicon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Prompt Organizer",
    description: "Herramienta visual para organizar prompts, auditorías, bugs y backlog técnico",
    url: "https://github.com/smouj/prompt-organizer",
    siteName: "Prompt Organizer",
    images: [
      {
        url: "/screenshots/desktop.png",
        width: 1344,
        height: 768,
        alt: "Prompt Organizer Desktop Screenshot",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Organizer",
    description: "Herramienta visual para organizar prompts, auditorías, bugs y backlog técnico",
    images: ["/screenshots/desktop.png"],
    creator: "@smouj",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Prompt Organizer",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2ede3" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
