import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../../lib/apiCourses";

export function useCourses(searchQuery: string = "") {
  const {
    data: courses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses", searchQuery], // Thêm searchQuery vào queryKey để refetch khi thay đổi
    queryFn: () => getCourses(searchQuery),
  });

  return { courses, isLoading, error };
}
