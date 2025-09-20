"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Course } from "../../lib/apiCourses";
import { useCart } from "../../app/context/CartContext";
import { toast } from "sonner";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(course);
    toast.success(`${course.title} has been added to your cart successfully!`, {
      duration: 3000,
      action: {
        label: "Undo",
        onClick: () => {
          console.log("Undo add to cart");
        },
      },
    });
  };

  return (
    <div className="mx-auto w-[283px]">
      <Card className="overflow-hidden w-[316px] h-[360px] p-[16px]">
        <CardHeader className="relative h-[132px] w-[283px] mx-auto rounded-lg p-0">
          <Link href={`/course/${course.id}`}>
            {course.imageUrl ? (
              <Image
                src={course.imageUrl}
                alt={course.title || "Course image"}
                fill
                className="object-cover rounded-lg hover:opacity-80 transition-opacity"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
                No images
              </div>
            )}
          </Link>
        </CardHeader>
        <CardContent className="flex flex-col justify-between h-[192px] p-0 pt-4">
          <div>
            <Link href={`/course/${course.id}`}>
              <CardTitle className="text-lg text-primary-900 leading-none pb-1 cursor-pointer hover:underline">
                {course.title}
              </CardTitle>
            </Link>
            {course.description && (
              <p className="text-[#363636] text-xs">{course.description}</p>
            )}
            {course.author && course.author.length > 0 && (
              <p className="text-gray-400 text-[9px]">{course.author}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              {course.ratings !== undefined && (
                <p className="text-gray-500 flex items-center gap-1 border rounded-md px-2 bg-gray-100 h-6">
                  <Star className="text-[#FF6F00] w-4 h-4" />
                  {course.ratings}
                </p>
              )}
              {course.totalRatings !== undefined && (
                <p className="text-gray-500 flex items-center h-6 gap-1 border rounded-md px-2 bg-gray-100">
                  {course.totalRatings} rating
                  {course.totalRatings > 1 ? "s" : ""}
                </p>
              )}
              {course.level && (
                <p className="text-gray-500 flex items-center gap-1 border rounded-md px-2 bg-gray-100 h-6">
                  {course.level}
                </p>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                {course.price !== undefined && (
                  <p className="text-gray-900">${course.price}.000</p>
                )}
                {course.originalPrice !== undefined && (
                  <p className="text-gray-500 line-through text-xs">
                    ${course.originalPrice}.000
                  </p>
                )}
              </div>
              <div>
                <Button
                  onClick={handleAddToCart}
                  className="bg-white border border-[#5E0078] text-[#5E0078] h-[25px] hover:bg-[#8d599b] hover:text-white"
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
