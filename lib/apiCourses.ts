import { supabase } from "./supabase";

export interface Course {
  id: string | number;
  title: string;
  description?: string;
  whatYoullLearn?: string[];
  courseContent?: {
    sections: {
      title: string;
      lectures: number;
      totalLength: string;
      lessons: { title: string; duration: string }[];
    }[];
    totalSections: number;
    totalLectures: number;
    totalLength: string;
  };
  imageUrl?: string;
  price?: number;
  originalPrice?: number;
  level?: string;
  lectures?: number;
  totalHours?: string;
  ratings?: number;
  totalRatings?: number;
  author?: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  students?: number;
  lastUpdated?: string;
  languages?: string[];
}

export async function getCourses(searchQuery?: string): Promise<Course[]> {
  let query = supabase.from("courses").select("*");

  if (searchQuery) {
    query = query.or(
      `title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching courses:", error);
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }

  return data || [];
}

export async function getCourseById(id: string): Promise<Course | null> {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching course by id:", error);
    return null;
  }

  return data;
}
