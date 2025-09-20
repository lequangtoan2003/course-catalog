"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Khởi tạo theme mặc định là "light"
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Sử dụng useEffect để truy cập localStorage sau khi component được gắn vào client
  useEffect(() => {
    // Kiểm tra xem có đang chạy trong trình duyệt không
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      const newTheme = (storedTheme as "light" | "dark") || "light";
      setTheme(newTheme);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      // Chỉ lưu vào localStorage nếu đang chạy trong trình duyệt
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme);
      }
      return newTheme;
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme phải được sử dụng trong ThemeProvider");
  }
  return context;
}
