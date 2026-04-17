import Link from "next/link";
import { 
  ArrowLeft, 
  MessageSquare, 
  Search, 
  Filter, 
  ThumbsUp, 
  MessageCircle, 
  PlayCircle, 
  Plus,
  CheckCircle2,
  MoreHorizontal
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const currentClass = {
  id: "pkg-11a2b3c4-d5e6-7f8a-9b0c-1234567890ab",
  code: "AA HL",
  title: "IBDP Math AA HL Mastery System"
};

const forumPosts = [
  {
    id: "post-1",
    type: "video_qa",
    videoReference: {
      id: "les-9a8b7c6d-5e4f-3a2b-1c0d-e9f8a7b6c5d4",
      title: "Translations & Dilations"
    },
    authorName: "Alex Chen",
    authorInitials: "AC",
    timeAgo: "2 hours ago",
    title: "I'm still a bit confused about horizontal dilations.",
    content: "Why does f(2x) compress the graph horizontally instead of stretching it? It feels counter-intuitive compared to vertical stretching.",
    upvotes: 14,
    replyCount: 1,
    isResolved: true,
  },
  {
    id: "post-2",
    type: "general",
    authorName: "Sarah Jenkins",
    authorInitials: "SJ",
    timeAgo: "5 hours ago",
    title: "Study Group for Topic 3: Geometry & Trig?",
    content: "Hey everyone! I'm struggling a bit with the 3D Geometry vectors stuff. Would anyone be interested in hopping on a Discord call this Saturday to go through the Past Paper questions together?",
    upvotes: 8,
    replyCount: 4,
    isResolved: false,
  },
  {
    id: "post-3",
    type: "video_qa",
    videoReference: {
      id: "les-9a8b7c6d-5e4f-3a2b-1c0d-e9f8a7b6c5d4",
      title: "Translations & Dilations"
    },
    authorName: "Bobby Brown",
    authorInitials: "BB",
    timeAgo: "1 day ago",
    title: "Translation vector direction?",
    content: "In the example at 22:15, if the translation vector is (-3, 4), does the equation become y = f(x+3) + 4 or y = f(x-3) + 4?",
    upvotes: 5,
    replyCount: 2,
    isResolved: true,
  },
  {
    id: "post-4",
    type: "general",
    authorName: "David O.",
    authorInitials: "DO",
    timeAgo: "3 days ago",
    title: "Are calculators allowed for Section A of Paper 2?",
    content: "Just checking the syllabus again—is the entirety of Paper 2 calculator allowed, or is it split like the old syllabus?",
    upvotes: 22,
    replyCount: 1,
    isResolved: true,
  }
];

export default async function ClassForumPage({ 
  params 
}: { 
  params: Promise<{ classId: string }> 
}) {
  const { classId } = await params;

  return (
    <div className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-8 bg-background">
      <div>
        <Link href={`/classes/${classId}`}>
          <Button variant="ghost" size="sm" className="mb-6 gap-2 text-muted-foreground hover:text-foreground -ml-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Curriculum
          </Button>
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold tracking-tight">Class Forum</h1>
              <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 uppercase tracking-wider font-bold">
                {currentClass.code}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Discuss concepts, ask questions, and collaborate with your peers and tutors.
            </p>
          </div>
          <Button className="gap-2 shadow-md">
            <Plus className="w-4 h-4" />
            New Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <div className="xl:col-span-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-card p-2 rounded-xl border border-border shadow-sm">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search discussions..." 
                className="w-full pl-9 border-none bg-transparent shadow-none focus-visible:ring-0"
              />
            </div>
            <div className="hidden sm:block w-px h-6 bg-border"></div>
            <div className="flex items-center gap-2 w-full sm:w-auto pr-2">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground flex-1 sm:flex-none justify-center">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="secondary" size="sm" className="gap-2 flex-1 sm:flex-none justify-center bg-muted/50">
                Latest
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {forumPosts.map((post) => (
              <Card key={post.id} className="p-0 bg-card border-border shadow-sm hover:border-primary/30 transition-colors overflow-hidden group">
                <div className="flex">
                  <div className="w-12 sm:w-14 bg-muted/20 flex flex-col items-center py-4 border-r border-border/50 shrink-0">
                    <button className="text-muted-foreground hover:text-primary transition-colors p-1">
                      <ThumbsUp className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-bold my-1 text-foreground">{post.upvotes}</span>
                  </div>

                  <div className="flex-1 p-4 sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[9px]">
                          {post.authorInitials}
                        </div>
                        <span className="font-semibold text-foreground">{post.authorName}</span>
                        <span>•</span>
                        <span>{post.timeAgo}</span>
                      </div>
                      {post.type === "video_qa" ? (
                        <Link href={`/lessons/${post.videoReference?.id}`}>
                          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 transition-colors gap-1.5 text-[10px] cursor-pointer">
                            <PlayCircle className="w-3 h-3" />
                            {post.videoReference?.title}
                          </Badge>
                        </Link>
                      ) : (
                        <Badge variant="secondary" className="bg-muted text-muted-foreground gap-1.5 text-[10px]">
                          <MessageSquare className="w-3 h-3" />
                          General Discussion
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold mb-1.5 leading-tight text-foreground group-hover:text-primary transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                      {post.content}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                      <button className="flex items-center gap-1.5 hover:text-foreground transition-colors bg-muted/30 px-2.5 py-1.5 rounded-md">
                        <MessageCircle className="w-3.5 h-3.5" />
                        {post.replyCount} {post.replyCount === 1 ? 'Reply' : 'Replies'}
                      </button>
                      
                      {post.isResolved && (
                        <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-500/10 px-2.5 py-1.5 rounded-md">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Answered
                        </span>
                      )}

                      <button className="ml-auto hover:text-foreground transition-colors p-1">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-4 text-muted-foreground">
            Load More Posts
          </Button>

        </div>

        <div className="xl:col-span-4 space-y-6 sticky top-24">
          <Card className="p-5 border-border shadow-sm bg-card">
            <h2 className="text-lg font-bold mb-2">About this Forum</h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              This space is for you to ask questions, share resources, and collaborate with your peers in {currentClass.code}. 
            </p>
            <div className="flex flex-col gap-3 text-sm font-medium">
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-muted-foreground">Total Members</span>
                <span>142</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-muted-foreground">Tutors Online</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 2
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-5 border-border shadow-sm bg-card">
            <h2 className="text-lg font-bold mb-4">Filter by Type</h2>
            <div className="flex flex-col gap-1.5">
              <Button variant="ghost" className="justify-start text-sm font-medium h-9 bg-primary/10 text-primary">
                All Discussions
              </Button>
              <Button variant="ghost" className="justify-start text-sm font-medium text-muted-foreground h-9">
                <MessageSquare className="w-4 h-4 mr-2" />
                General Posts
              </Button>
              <Button variant="ghost" className="justify-start text-sm font-medium text-muted-foreground h-9">
                <PlayCircle className="w-4 h-4 mr-2" />
                Video Q&A
              </Button>
              <Button variant="ghost" className="justify-start text-sm font-medium text-muted-foreground h-9">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Resolved Questions
              </Button>
            </div>
          </Card>

        </div>

      </div>
    </div>
  );
}
