import { ClassHeader } from "@/components/classes/class-header";
import { UpNextHero } from "@/components/classes/up-next-hero";
import { ClassUpdatesFeed } from "@/components/classes/class-updates-feed";
import { CommunityBanner } from "@/components/classes/community-banner";
import { CurriculumAccordion } from "@/components/classes/curriculum-accordion";
import { 
  Bell, 
  CalendarDays, 
  Megaphone 
} from "lucide-react";

const currentClass = {
  id: "pkg-11a2b3c4-d5e6-7f8a-9b0c-1234567890ab",
  code: "AA HL",
  title: "IBDP Math AA HL Mastery System"
};

const classTutor = {
  name: "Winson Siu",
  initials: "WS",
  role: "Lead Instructor"
};

const classAnnouncements = [
  {
    id: "ann-math-1",
    title: "Topic 2 Practice Quiz Live",
    content: "I have just published a 15-question practice quiz for Functions. I highly recommend completing it before moving on to Calculus. Focus heavily on the composite function questions at the end, as those reflect the Section B style questions you will see on Paper 1.",
    date: "4 hours ago",
    type: "important",
    comments: 3,
    icon: Bell,
    link: {
      url: "#",
      title: "Start Practice Quiz: Functions & Transformations"
    }
  },
  {
    id: "ann-math-2",
    title: "Correction in Video 2.2",
    content: "At timestamp 14:20 in the Translations video, the x-axis shift should be to the LEFT, not the right. A note has been added to the video player, but please update your written notes if you copied that example down! See the attached Desmos graph for the correct visual.",
    date: "2 days ago",
    type: "standard",
    comments: 0,
    icon: Megaphone,
    image: {
      url: "placeholder",
      alt: "Desmos Graph showing leftward shift"
    }
  },
  {
    id: "ann-math-3",
    title: "Calculus Bootcamp Next Week",
    content: "We will be running a live deep-dive into Integration by Parts next Thursday. Check your email for the Zoom link. I've attached the prerequisite worksheet below—please complete it beforehand so we can jump straight into the hard problems.",
    date: "5 days ago",
    type: "event",
    comments: 12,
    icon: CalendarDays
  }
];

const curriculum = [
  {
    id: "top-d290f1ee-6c54-4b01-90e6-d701748f0851",
    title: "Topic 1: Number & Algebra",
    totalDuration: "4h 15m",
    status: "completed",
    resources: [
      { id: "res-t1-1", title: "Topic 1 Complete Study Guide", size: "4.2 MB" },
      { id: "res-t1-2", title: "Algebra Formula Cheat Sheet", size: "1.1 MB" }
    ],
    subtopics: [
      {
        id: "sub-1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        title: "1.1 Sequences and Series",
        resources: [
          { id: "res-s1-1", title: "1.1 Practice Problem Set", size: "845 KB" }
        ],
        videos: [
          { id: "les-c64a5d8b-1a2b-3c4d-5e6f-7a8b9c0d1e2f", title: "Arithmetic Sequences & Series", duration: "25m", completed: true },
          { id: "les-b31d9e7c-8f9a-0b1c-2d3e-4f5a6b7c8d9e", title: "Geometric Sequences & Series", duration: "30m", completed: true },
        ]
      },
      {
        id: "sub-f1e2d3c4-b5a6-9f8e-7d6c-5b4a3f2e1d0c",
        title: "1.2 Exponents and Logarithms",
        resources: [],
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
    resources: [
      { id: "res-t2-1", title: "Functions Core Concepts Summary", size: "3.5 MB" }
    ],
    subtopics: [
      {
        id: "sub-5c6d7e8f-9a0b-1c2d-3e4f-a5b6c7d8e9f0",
        title: "2.1 Linear & Quadratic Functions",
        resources: [
          { id: "res-s2-1", title: "Completing the Square Worksheet", size: "500 KB" }
        ],
        videos: [
          { id: "les-9a0b1c2d-3e4f-5a6b-7c8d-e9f0a1b2c3d4", title: "Domain, Range & Composites", duration: "40m", completed: true },
          { id: "les-2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e", title: "Inverse Functions", duration: "35m", completed: true },
        ]
      },
      {
        id: "sub-8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e",
        title: "2.2 Transformations",
        resources: [],
        videos: [
          { id: "les-9a8b7c6d-5e4f-3a2b-1c0d-e9f8a7b6c5d4", title: "Translations & Dilations", duration: "45m", completed: false }, 
          { id: "les-4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e", title: "Absolute Value Transformations", duration: "30m", completed: false },
        ]
      }
    ]
  },
  {
    id: "top-e9b7b9cc-8b45-4246-8805-4c0716c5b96b",
    title: "Topic 3: Geometry & Trigonometry",
    totalDuration: "6h 00m",
    status: "locked",
    resources: [],
    subtopics: [
      {
        id: "sub-1c2d3e4f-5a6b-7c8d-9e0f-1a2b3c4d5e6f",
        title: "3.1 3D Geometry",
        resources: [],
        videos: [
          { id: "les-7c8d9e0f-1a2b-3c4d-5e6f-7a8b9c0d1e2f", title: "Volume & Surface Area", duration: "30m", completed: false },
          { id: "les-3d4e5f6a-7b8c-9d0e-1f2a-3b4c5d6e7f8a", title: "Angles in 3D Space", duration: "40m", completed: false },
        ]
      },
      {
        id: "sub-9e0f1a2b-3c4d-5e6f-7a8b-9c0d1e2f3a4b",
        title: "3.2 Trigonometric Functions",
        resources: [],
        videos: [
          { id: "les-5f6a7b8c-9d0e-1f2a-3b4c-5d6e7f8a9b0c", title: "The Unit Circle", duration: "35m", completed: false },
        ]
      }
    ]
  },
  {
    id: "top-4a5b6c7d-8e9f-0a1b-2c3d-4e5f6a7b8c9d",
    title: "Topic 4: Statistics & Probability",
    totalDuration: "4h 45m",
    status: "locked",
    resources: [],
    subtopics: [
      {
        id: "sub-0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
        title: "4.1 Descriptive Statistics",
        resources: [],
        videos: [
          { id: "les-6b7c8d9e-0f1a-2b3c-4d5e-6f7a8b9c0d1e", title: "Mean, Variance & Standard Deviation", duration: "40m", completed: false },
        ]
      }
    ]
  },
  {
    id: "top-2c3d4e5f-6a7b-8c9d-0e1f-2a3b4c5d6e7f",
    title: "Topic 5: Calculus",
    totalDuration: "8h 20m",
    status: "locked",
    resources: [],
    subtopics: [
      {
        id: "sub-8c9d0e1f-2a3b-4c5d-6e7f-8a9b0c1d2e3f",
        title: "5.1 Differentiation",
        resources: [],
        videos: [
          { id: "les-2d3e4f5a-6b7c-8d9e-0f1a-2b3c4d5e6f7a", title: "Limits & First Principles", duration: "45m", completed: false },
          { id: "les-8e9f0a1b-2c3d-4e5f-6a7b-8c9d0e1f2a3b", title: "Chain, Product & Quotient Rules", duration: "50m", completed: false },
        ]
      }
    ]
  }
];

export default async function ClassCurriculumPage({ 
  params 
}: { 
  params: Promise<{ classId: string }> 
}) {
  const { classId } = await params;
  const overallProgress = 38;

  const allVideos = curriculum.flatMap(topic => 
    topic.subtopics.flatMap(sub => 
      sub.videos.map(video => ({
        ...video,
        topicTitle: topic.title,
        subtopicTitle: sub.title,
        topicStatus: topic.status
      }))
    )
  );
  
  const nextVideo = allVideos.find(v => !v.completed && v.topicStatus !== "locked");

  return (
    <div className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-8">
      
      <ClassHeader 
        title={currentClass.title} 
        progress={overallProgress} 
      />

      <UpNextHero video={nextVideo} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <ClassUpdatesFeed 
          announcements={classAnnouncements} 
          tutor={classTutor} 
        />

        <div className="xl:col-span-5 space-y-8 sticky top-24">
          <CommunityBanner classId={classId} />
          <CurriculumAccordion curriculum={curriculum} />
        </div>
      </div>

    </div>
  );
}
