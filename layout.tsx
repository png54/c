import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://khidamati.dz"
  ),
  title: {
    default: "خدماتي - منصة الخدمات المنزلية في الجزائر",
    template: "%s | خدماتي",
  },
  description:
    "منصة خدماتي تربطك بأفضل الحرفيين والمهنيين في الجزائر. اعثر على كهربائي، سباك، نجار، دهان، ومصلح أجهزة قريب منك بسهولة وأمان.",
  keywords: [
    "خدمات منزلية",
    "حرفيين الجزائر",
    "كهربائي",
    "سباك",
    "نجار",
    "دهان",
    "صيانة",
    "Algérie",
    "services",
    "artisans",
    "plombier",
    "électricien",
  ],
  authors: [{ name: "خدماتي" }],
  creator: "خدماتي",
  publisher: "خدماتي",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ar_DZ",
    alternateLocale: ["fr_DZ"],
    url: "https://khidamati.dz",
    siteName: "خدماتي",
    title: "خدماتي - منصة الخدمات المنزلية في الجزائر",
    description:
      "اعثر على حرفي محترف موثوق قريب منك بسهولة وأمان. كهربائي، سباك، نجار، دهان وأكثر.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "خدماتي - منصة الخدمات المنزلية",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "خدماتي - منصة الخدمات المنزلية في الجزائر",
    description: "اعثر على حرفي موثوق قريب منك",
    images: ["/og-image.jpg"],
  },
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700;800&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#2563EB" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-arabic antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                fontFamily: "'Cairo', 'Tajawal', sans-serif",
                direction: "rtl",
                textAlign: "right",
                borderRadius: "12px",
                fontSize: "0.9rem",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              },
              success: {
                iconTheme: {
                  primary: "#10B981",
                  secondary: "#fff",
                },
                style: {
                  border: "1px solid #D1FAE5",
                  background: "#ECFDF5",
                  color: "#065F46",
                },
              },
              error: {
                iconTheme: {
                  primary: "#EF4444",
                  secondary: "#fff",
                },
                style: {
                  border: "1px solid #FEE2E2",
                  background: "#FEF2F2",
                  color: "#991B1B",
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
