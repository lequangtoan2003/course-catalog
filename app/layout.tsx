// app/layout.tsx
import { Providers } from "./providers";
import "./styles/globals.css";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "@/components/ui/sonner";

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
        <CartProvider>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </CartProvider>
      </body>
    </html>
  );
}
