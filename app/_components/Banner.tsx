import Image from "next/image";
import bg from "../../public/bg-course.jpg";
import bgbanner from "../../public/img-fullstacknext.webp";
import { CircleArrowRight } from "lucide-react";

export default function Banner() {
  return (
    <div className="relative w-full h-[437px]">
      <Image
        src={bg}
        fill
        quality={100}
        alt="bg"
        placeholder="blur"
        className="object-cover"
      />
      <div className="absolute inset-0">
        <div className="flex flex-col items-center justify-center gap-8 h-full xl:hidden px-6">
          <div className="flex flex-col gap-4 text-center">
            <h1 className="text-white text-xl font-bold">Our latest course:</h1>
            <h1 className="text-white text-xl font-bold max-w-[260px]">
              Reactjs and Nextjs with Full-Stack
            </h1>
            <button className="h-[39px] w-[146px] rounded-sm bg-[#B2AF0A] text-white flex items-center gap-2 justify-center p-2 mx-auto">
              Enroll Now
              <CircleArrowRight />
            </button>
          </div>

          <div className="w-[260px] sm:w-[300px] md:w-[329px] rounded-lg flex flex-col gap-4 bg-white shadow-md">
            <Image
              src={bgbanner}
              alt="course"
              width={329}
              height={179}
              className="rounded-t-lg object-cover w-full h-[180px]"
            />
            <div className="text-black flex items-center justify-center p-3">
              <h1 className="font-bold">Full-Stack</h1>
            </div>
          </div>
        </div>

        <div className="hidden xl:block">
          <div className="absolute left-[338px] top-1/2 -translate-y-1/2 flex flex-col gap-6">
            <h1 className="text-white text-2xl font-bold">
              Our latest course:
            </h1>
            <h1 className="text-white text-2xl font-bold w-[227px]">
              Reactjs and Nextjs with Full-Stack
            </h1>
            <div className="h-[39px] w-[146px] rounded-sm bg-[#B2AF0A] text-white flex items-center gap-2 justify-center p-2">
              Enroll Now
              <span>
                <CircleArrowRight />
              </span>
            </div>
          </div>

          <div className="absolute left-[851px] top-1/2 -translate-y-1/2 w-[329px] h-[253px] rounded-lg flex flex-col gap-4 bg-white">
            <Image
              src={bgbanner}
              alt="course"
              width={329}
              height={179}
              className="rounded-t-lg object-cover"
            />
            <div className="text-black flex items-center justify-center">
              <h1 className="font-bold">Full-Stack</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
