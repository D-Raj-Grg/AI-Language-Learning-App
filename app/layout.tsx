import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/error-boundary";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://linguachat.app"),
  title: {
    default: "LinguaChat - AI-Powered Language Learning",
    template: "%s | LinguaChat",
  },
  description:
    "Master any language through natural conversations with AI. Practice real dialogue, receive instant feedback, and build confidence in Spanish, French, German, Italian, or Japanese.",
  keywords: [
    "language learning",
    "AI language tutor",
    "learn Spanish",
    "learn French",
    "learn German",
    "learn Italian",
    "learn Japanese",
    "conversation practice",
    "language practice app",
    "AI conversation",
    "language learning app",
    "instant feedback",
    "vocabulary tracking",
  ],
  authors: [{ name: "LinguaChat Team" }],
  creator: "LinguaChat",
  publisher: "LinguaChat",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "LinguaChat - AI-Powered Language Learning",
    description:
      "Master any language through natural conversations with AI. Practice real dialogue in 5 languages with instant feedback.",
    siteName: "LinguaChat",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "LinguaChat - AI Language Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LinguaChat - AI-Powered Language Learning",
    description:
      "Master any language through natural conversations with AI. Practice real dialogue with instant feedback.",
    images: ["/og-image.svg"],
    creator: "@linguachat",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
