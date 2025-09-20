"use client";

import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cartItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="relative flex items-center justify-between p-4">
      <div className="flex items-center justify-center gap-2">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold text-black ">Logo</h1>
        </Link>
        <span className="text-gray-500 mt-1">Explore</span>
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="relative cursor-pointer" onClick={toggleCart}>
          <ShoppingCart />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {cartItems.length}
            </span>
          )}
        </div>
        <div className="">
          <Heart />
        </div>
        <div className="w-[48px] h-[48px] bg-[#16001B] rounded-full flex items-center justify-center">
          <h1 className="text-white">LT</h1>
        </div>
      </div>

      {isCartOpen && (
        <div className="absolute top-12 right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4">
          <h2 className="text-lg font-bold mb-4">Your Cart</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 border-b pb-2"
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
                    <div className="w-[50px] h-[50px] bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                      No image
                    </div>
                  )}
                  <div className="flex flex-col">
                    <h3 className="font-semibold">{item.title}</h3>{" "}
                    {item.price !== undefined && (
                      <p className="text-gray-900">${item.price}.000</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
