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
    { name: "Transformation Cheat Sheet", size: "1.4 MB" },
    { name: "Practice Problem Set", size: "2.1 MB" },
    { name: "Mark Scheme", size: "0.8 MB" },
  ]
};

const curriculum = [
  {
    id: "top-d290f1ee-6c54-4b01-90e6-d701748f0851",
    title: "Topic 1: Number & Algebra",
    totalDuration: "4h 15m",
    status: "completed",
    subtopics: [
      {
        id: "sub-1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        title: "1.1 Sequences and Series",
        videos: [
          { id: "les-c64a5d8b-1a2b-3c4d-5e6f-7a8b9c0d1e2f", title: "Arithmetic Sequences & Series", duration: "25m", completed: true },
          { id: "les-b31d9e7c-8f9a-0b1c-2d3e-4f5a6b7c8d9e", title: "Geometric Sequences & Series", duration: "30m", completed: true },
        ]
      },
      {
        id: "sub-f1e2d3c4-b5a6-9f8e-7d6c-5b4a3f2e1d0c",
        title: "1.2 Exponents and Logarithms",
        videos: [
          { id: "les-7a8b9c0d-1e2f-3a4b-5c6d-e7f8a9b0c1d2", title: "Laws of Exponents", duration: "20m", completed: true },
          { id: "les-3a4b5c6d-7e8f-9a0b-1c2d-e3f4a5b6c7d8", title: "Logarithmic Equations", duration: "35m", completed: true },
        ]
      }
    ]
  },
  {
    id: "top-8a2b5c71-3318-4221-8408-72481023023e",
    title: "Topic 2: Functions",
    totalDuration: "5h 30m",
    status: "active",
    subtopics: [
      {
        id: "sub-5c6d7e8f-9a0b-1c2d-3e4f-a5b6c7d8e9f0",
        title: "2.1 Linear & Quadratic Functions",
        videos: [
          { id: "les-9a0b1c2d-3e4f-5a6b-7c8d-e9f0a1b2c3d4", title: "Domain, Range & Composites", duration: "40m", completed: true },
          { id: "les-2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e", title: "Inverse Functions", duration: "35m", completed: true },
        ]
      },
      {
        id: "sub-8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e",
        title: "2.2 Transformations",
        videos: [
          { id: "les-9a8b7c6d-5e4f-3a2b-1c0d-e9f8a7b6c5d4", title: "Translations & Dilations", duration: "45m", completed: false }, 
          { id: "les-4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e", title: "Absolute Value Transformations", duration: "30m", completed: false },
        ]
      }
    ]
  }
];

export default async function LessonPlayerPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;

  // Real DB Fetching logic (commented out for now)
  // const supabase = await createClient();
  // const { data: video } = await supabase.from("videos").select("*").eq("id", lessonId).single();
  // if (!video) return redirect("/courses");

  const videoData = mockVideoData; 

  const activeTopic = curriculum.find(topic => 
    topic.subtopics.some(sub => 
      sub.videos.some(video => video.id === lessonId)
    )
  );

  return (
    <LessonPlayerClient 
      lessonId={lessonId} 
      lessonData={videoData} 
      curriculum={curriculum}
      activeTopic={activeTopic}
    />
  );
}