import { useCourses } from "../hooks/useCourses";
import { ClipLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { CourseCard } from "./CourseCard";
import { CourseFilters } from "./CourseFilters";
import { Course } from "../../lib/apiCourses";

export function CourseCatalog() {
  const { courses, isLoading, error } = useCourses();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedRating, setSelectedRating] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const filteredCourses: Course[] = (courses as Course[])
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
        <p className="text-center text-muted-foreground">
          <ClipLoader color="hsl(var(--primary))" size={50} />{" "}
        </p>
      </div>
    );
  }

  if (error) {
    console.error("Error loading courses:", error);
    return (
      <div className="container mx-auto py-10">
        <p className="text-center text-destructive">
          An error occurred while loading the course list. Check the console for
          details.
        </p>
      </div>
    );
  }

  return (
    <div className="container pb-10 mx-auto max-w-[992px]">
      <CourseFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        clearFilters={clearFilters}
      />
      {filteredCourses.length === 0 ? (
        <p className="text-center text-muted-foreground">
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
                className="bg-background border border-primary text-primary h-[25px] hover:bg-secondary hover:text-secondary-foreground rounded-full px-4"
              >
                Previous
              </Button>
              <span className="text-primary">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="bg-background border border-primary text-primary h-[25px] hover:bg-secondary hover:text-secondary-foreground rounded-full px-4"
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
