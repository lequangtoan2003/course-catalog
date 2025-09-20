// app/layout.tsx
import { Providers } from "./providers";
import "./styles/globals.css";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./context/ThemeContext";

export const metadata = {
  title: "Course Catalog",
  description: "A catalog of online courses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <CartProvider>
            <Providers>
              {children}
              <Toaster />
            </Providers>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
