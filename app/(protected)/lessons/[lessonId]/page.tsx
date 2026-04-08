import { createClient } from "@/lib/supabase/server";
import { LessonPlayerClient } from "@/components/courses/lesson-player-client";
import { redirect } from "next/navigation";

const mockVideoData = {
  id: "les-9a8b7c6d-5e4f-3a2b-1c0d-e9f8a7b6c5d4",
  title: "Translations & Dilations",
  topic: "Topic 2: Functions",
  subtopic: "2.2 Transformations",
  duration: "45m",
  description: "In this deep dive, we explore how translations and dilations alter the graph of a function. We cover horizontal and vertical shifts, stretches, and how to represent these transformations algebraically.",
  resources: [
    { name: "Transformation Cheat Sheet (PDF)", size: "1.4 MB" },
    { name: "Practice Problem Set", size: "2.1 MB" },
    { name: "Mark Scheme", size: "0.8 MB" },
  ]
};

export default async function LessonPlayerPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;

  // Real DB Fetching logic (commented out for now)
  // const supabase = await createClient();
  // const { data: video } = await supabase.from("videos").select("*").eq("id", lessonId).single();
  // if (!video) return redirect("/courses");

  const videoData = mockVideoData; 

  return (
    <LessonPlayerClient 
      lessonId={lessonId} 
      lessonData={videoData} 
    />
  );
}