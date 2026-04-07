import { createClient } from "@/lib/supabase/server";
import { LessonPlayerClient } from "@/components/courses/lesson-player-client";
import { redirect } from "next/navigation";

const mockLessonData = {
  id: "les-9a8b7c6d-5e4f-3a2b-1c0d-e9f8a7b6c5d4",
  title: "Inverse Functions & Transformations",
  module: "Module 2: Functions",
  duration: "1h 10m",
  description: "In this deep dive, we explore the relationship between a function and its inverse. We cover the horizontal line test, algebraic methods for finding f⁻¹(x), and how transformations affect the domain and range of inverse functions.",
  resources: [
    { name: "Lesson Slides (PDF)", size: "2.4 MB" },
    { name: "Practice Problem Set", size: "1.1 MB" },
    { name: "Formula Cheat Sheet", size: "0.5 MB" },
  ]
};

export default async function LessonPlayerPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;

  // Real DB Fetching logic (commented out until you run the SQL)
  // const supabase = await createClient();
  // const { data: lesson } = await supabase.from("lessons").select("*").eq("id", lessonId).single();
  // if (!lesson) return redirect("/courses");
  
  // Using mock data for now so the UI doesn't crash
  const lessonData = mockLessonData; 

  return (
    <LessonPlayerClient 
      lessonId={lessonId} 
      lessonData={lessonData} 
    />
  );
}
