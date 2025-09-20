import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CourseFilters({
  searchQuery,
  setSearchQuery,
  selectedLevel,
  setSelectedLevel,
  selectedRating,
  setSelectedRating,
  clearFilters,
}) {
  return (
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
  );
}
