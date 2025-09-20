import { useCourses } from "../hooks/useCourses";
import { ClipLoader } from "react-spinners";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CourseCard } from "./CourseCard";

export function CourseCatalog() {
  const { courses, isLoading, error } = useCourses();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredCourses = courses
    .filter(
      (course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.description &&
          course.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .filter((course) => {
      if (selectedLevel === "all") return true;
      return course.level === selectedLevel;
    })
    .filter((course) => {
      if (selectedRating === "all") return true;
      const rating = course.ratings || 0;
      if (selectedRating === "4-5") return rating >= 4;
      if (selectedRating === "3-4") return rating > 3 && rating < 4;
      if (selectedRating === "1-3") return rating <= 3;
      return false;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedLevel, selectedRating]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLevel("all");
    setSelectedRating("all");
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-center text-primary-700">
            Course Catalog
          </h1>
          <div className="relative w-[274px] mx-auto">
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md mx-auto rounded-full pl-10"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
          </div>
        </div>
        <p className="text-center text-gray-600">
          <ClipLoader color="#0070f3" size={50} />
        </p>
      </div>
    );
  }

  if (error) {
    console.error("Error loading courses:", error);
    return (
      <div className="container mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-center text-primary-700">
            Course Catalog
          </h1>
          <div className="relative w-[274px] mx-auto">
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md mx-auto rounded-full pl-10"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
          </div>
        </div>
        <p className="text-center text-red-500">
          An error occurred while loading the course list. Check the console for
          details.
        </p>
      </div>
    );
  }

  return (
    <div className="container pb-10 mx-auto max-w-[992px]">
      <div className="flex gap-2 justify-start items-center p-4">
        <Select onValueChange={setSelectedLevel} value={selectedLevel}>
          <SelectTrigger className="w-[110px] rounded-full border-gray-950">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Level</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="All Levels">All Levels</SelectItem>
            <SelectItem value="Expert">Expert</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setSelectedRating} value={selectedRating}>
          <SelectTrigger className="w-[118px] rounded-full border-gray-950">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Ratings</SelectItem>
            <SelectItem value="4-5">4-5 star</SelectItem>
            <SelectItem value="3-4">3-4 star</SelectItem>
            <SelectItem value="1-3">1-3 star</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative w-[274px]">
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border-gray-950 pl-10"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
        </div>
        <Button
          onClick={clearFilters}
          className="bg-white border border-[#5E0078] text-[#5E0078] h-[25px] hover:bg-[#8d599b] hover:text-white rounded-full px-4"
        >
          Clear Filters
        </Button>
      </div>
      {filteredCourses.length === 0 ? (
        <p className="text-center text-gray-600">
          No matching courses were found.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <Button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="bg-white border border-[#5E0078] text-[#5E0078] h-[25px] hover:bg-[#8d599b] hover:text-white rounded-full px-4"
              >
                Previous
              </Button>
              <span className="text-[#5E0078]">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="bg-white border border-[#5E0078] text-[#5E0078] h-[25px] hover:bg-[#8d599b] hover:text-white rounded-full px-4"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
