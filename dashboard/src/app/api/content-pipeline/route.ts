import { NextResponse } from "next/server";
import type { ContentItem } from "@/types";

const mockContentPipeline: ContentItem[] = [
  {
    id: "content-1",
    title: "AI Trends 2024",
    type: "article",
    status: "published",
    author: "Research Agent",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "content-2",
    title: "Product Demo Video",
    type: "video",
    status: "review",
    author: "Content Agent",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "content-3",
    title: "Tech Podcast Ep. 42",
    type: "podcast",
    status: "draft",
    author: "Content Agent",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    id: "content-4",
    title: "Twitter Thread",
    type: "social",
    status: "idea",
    author: "Research Agent",
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "content-5",
    title: "API Documentation",
    type: "article",
    status: "in-progress",
    author: "Code Agent",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
];

export async function GET() {
  try {
    return NextResponse.json(mockContentPipeline);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch content pipeline" },
      { status: 500 }
    );
  }
}