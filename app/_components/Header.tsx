"use client";

import { Heart, Moon, ShoppingCart, Sun } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { cartItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="relative flex items-center justify-between p-4 bg-background text-foreground">
      <div className="flex items-center justify-center gap-2">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold text-foreground ">Logo</h1>
        </Link>
        <span className="text-muted-foreground mt-1">Explore</span>
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="relative cursor-pointer" onClick={toggleCart}>
          <ShoppingCart />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full px-2 py-1">
              {cartItems.length}
            </span>
          )}
        </div>
        <div className="">
          <Heart />
        </div>
        <div className="">
          <Button
            onClick={toggleTheme}
            className="bg-background border border-primary text-primary h-[25px] hover:bg-secondary hover:text-secondary-foreground rounded-full px-4"
          >
            {theme === "light" ? (
              <Moon size={20} className="text-primary" />
            ) : (
              <Sun size={20} className="text-primary" />
            )}
          </Button>
        </div>
        <div className="w-[48px] h-[48px] bg-primary rounded-full flex items-center justify-center">
          <h1 className="text-primary-foreground">LT</h1>
        </div>
      </div>
      {isCartOpen && (
        <div className="absolute top-12 right-0 mt-2 w-80 bg-background border border-border rounded-lg shadow-lg z-50 p-4">
          {cartItems.length === 0 ? (
            <p className="text-muted-foreground">Your cart is empty.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 border-b border-border pb-2"
                >
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title || "Course image"}
                      width={50}
                      height={50}
                      className="object-cover rounded"
                    />
                  ) : (
                    <div className="w-[50px] h-[50px] bg-muted flex items-center justify-center text-muted-foreground text-xs">
                      No image
                    </div>
                  )}
                  <div className="flex flex-col">
                    <h3 className="font-semibold">{item.title}</h3>{" "}
                    {item.price !== undefined && (
                      <p className="text-foreground">${item.price}.000</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          <button className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
