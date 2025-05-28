import RecentPanel from "@/components/dashboard/recent-panel";

const initialItems = [
  {
    id: "1",
    title: "Project Alpha",
    thumbnailUrl: "https://picsum.photos/200",
    category: "projects" as const,
  },
  {
    id: "2",
    title: "Design System",
    thumbnailUrl: "https://picsum.photos/201",
    category: "designs" as const,
  },
  {
    id: "3",
    title: "API Documentation",
    thumbnailUrl: "https://picsum.photos/202",
    category: "docs" as const,
  },
];

export default function Page() {
  return <RecentPanel items={initialItems} />;
} 