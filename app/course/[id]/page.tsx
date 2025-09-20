import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCourseById } from "@/lib/apiCourses";
import { Check, ChevronDown, Heart, Star } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface CoursePageProps {
  params: { id: string };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const course = await getCourseById(params.id);

  if (!course) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen max-w-[1512px] mx-auto">
      <Header />
      <div className="relative w-full h-auto bg-[#0F0013] dark:bg-gray-800 lg:h-[371px]">
        <div className="w-full p-[50px] lg:absolute lg:w-[600px] lg:left-[300px] lg:p-[50px]">
          <h1 className="text-white text-2xl font-semibold mb-2">
            {course.title}
          </h1>
          <h5 className="mb-8">
            {course.description && (
              <p className="text-[#D7D7D7] dark:text-gray-300 mb-4">
                {course.description}
              </p>
            )}
          </h5>
          <div className="flex gap-2 items-center mb-6">
            <div className="">
              {course.isBestseller && (
                <div className="w-[85px] h-[28] bg-[#FFB5B5] dark:bg-red-300 rounded-md font-semibold text-[#5E0303] dark:text-red-900">
                  Hot & New
                </div>
              )}
              {course.isNew && (
                <div className="w-[85px] h-[28] bg-[#FFB5B5] dark:bg-red-300 rounded-md font-semibold text-[#5E0303] dark:text-red-900">
                  Hot & New
                </div>
              )}
            </div>
            <div className="">
              {course.ratings !== undefined && (
                <p className="text-[#C44332] dark:text-orange-400 flex gap-1 items-center">
                  {course.ratings}{" "}
                  <span className="flex">
                    <Star className="w-4 text-[#FF6F00] dark:text-orange-400" />
                    <Star className="w-4 text-[#FF6F00] dark:text-orange-400" />
                    <Star className="w-4 text-[#FF6F00] dark:text-orange-400" />
                    <Star className="w-4 text-[#FF6F00] dark:text-orange-400" />
                    <Star className="w-4 text-[#FF6F00] dark:text-orange-400" />
                  </span>
                </p>
              )}
            </div>
            <div className="">
              {course.totalRatings !== undefined && (
                <p className="text-[#6E4693] dark:text-purple-400 font-bold underline cursor-pointer">
                  ({course.totalRatings} rating
                  {course.totalRatings > 1 ? "s" : ""})
                </p>
              )}
            </div>
          </div>
          <div className="text-white flex gap-1 mb-4">
            Create by
            <span>
              {course.author && (
                <p className="text-[#6E4693] dark:text-purple-400 font-semibold underline cursor-pointer">
                  {course.author}
                </p>
              )}
            </span>
          </div>
          <div className="flex gap-6">
            <div className="text-gray-500 dark:text-gray-400 flex gap-1">
              Last updated
              {course.lastUpdated && (
                <span className="">{course.lastUpdated}</span>
              )}
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              {course.languages && <span className="">{course.languages}</span>}
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              {course.languages && (
                <span className="">{course.languages} [Auto]</span>
              )}
            </div>
          </div>
        </div>
        {/* content right */}
        <div className="bg-white dark:bg-gray-700 text-white w-full h-auto shadow-lg lg:absolute lg:left-[901px] lg:top-[25px] lg:w-[311px] lg:h-[611px]">
          <div className="relative w-full h-[157px] lg:w-[311px]">
            {course.imageUrl && (
              <Image
                src={course.imageUrl}
                alt={course.title}
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="flex flex-col gap-2 px-6 py-6 lg:px-12 lg:py-6">
            <div className="flex gap-2 items-center">
              {course.price !== undefined && (
                <p className="text-gray-900 dark:text-white font-semibold text-2xl">
                  ${course.price}.000
                </p>
              )}
              {course.originalPrice !== undefined && (
                <p className="text-gray-500 dark:text-gray-400 line-through text-xs">
                  ${course.originalPrice}.000
                </p>
              )}
            </div>
            <span className="text-red-600 dark:text-red-400">
              <span className="text-red-700 dark:text-red-500 font-semibold">
                11 hours
              </span>{" "}
              left at this price!
            </span>
            <div className="flex gap-3">
              <Button className="border bg-[#5E0078] dark:bg-purple-700 text-white h-[35px] flex-1 hover:bg-[#8d599b] dark:hover:bg-purple-600 hover:text-white lg:w-[166px]">
                Add to cart
              </Button>
              <Button className="border bg-white dark:bg-gray-700 border-[#5E0078] dark:border-purple-700 text-white h-[35px] w-[38px] hover:bg-[#8d599b] dark:hover:bg-purple-600 hover:text-white">
                <Heart className="text-[#5E0078] dark:text-purple-400 h-[25px] w-[25px]" />
              </Button>
            </div>
            <Button className="border bg-gray-200 dark:bg-gray-600 border-[#5E0078] dark:border-purple-700 text-[#5E0078] dark:text-purple-400 h-[35px] w-full hover:bg-[#8d599b] dark:hover:bg-purple-600 hover:text-white">
              Proceed with ****
            </Button>
            <span className="font-semibold text-gray-600 dark:text-gray-300 py-2">
              This course includes:
            </span>
            <span className="font-normal text-base text-gray-500 dark:text-gray-400">
              25.5 hours on-demand video
            </span>
            <span className="font-normal text-base text-gray-500 dark:text-gray-400">
              Access on mobile and TV
            </span>
            <span className="font-normal text-base text-gray-500 dark:text-gray-400">
              Certificate of completion
            </span>
            <span className="font-normal text-base text-gray-500 dark:text-gray-400 mb-2">
              18 downloadable resources
            </span>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter Coupon"
                className=" h-[35px] text-black dark:text-white flex-1 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400"
              />
              <Button className="border bg-[#5E0078] dark:bg-purple-700 text-white h-[35px] w-[86px] hover:bg-[#8d599b] dark:hover:bg-purple-600 hover:text-white">
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* learning page  */}

      <div className="relative left-0 border w-full h-auto mt-10 lg:left-[100px] 2xl:left-[0px] xl:left-[0px] lg:w-[790px] border-gray-200 dark:border-gray-700">
        <div className="p-2">
          <h1 className="font-semibold px-2 text-xl dark:text-white">
            What you will learn
          </h1>
          <div className="pt-4 pb-6">
            {course.whatYoullLearn && course.whatYoullLearn.length > 0 && (
              <div>
                <ul className="list-disc list-inside flex gap-5 flex-col text-sm text-gray-600 dark:text-gray-400">
                  {course.whatYoullLearn.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* content page  */}

      <div className="relative left-0 w-full h-auto mt-10 lg:left-[100px] 2xl:-left-[10px] xl:left-[0px] lg:w-[790px]">
        <div className="p-2">
          <h1 className="font-semibold px-2 text-3xl text-gray-800 dark:text-white">
            Course content
          </h1>
          <div className="flex justify-between items-center px-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="text-[#AB0B98] dark:text-purple-400 cursor-pointer">
              Expand all sections
            </span>
          </div>
          <div className="mt-4">
            {course?.courseContent?.sections?.map((section, index) => (
              <div
                key={index}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <div className="w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex items-center">
                    <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2" />
                    <span className="text-blue-900 dark:text-blue-300 font-medium">
                      {section.title}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {section.lectures} lectures • {section.totalLength}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
