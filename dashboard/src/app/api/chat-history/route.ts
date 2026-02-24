import { NextResponse } from "next/server";
import type { ChatMessage } from "@/types";

const mockChatHistory: ChatMessage[] = [
  {
    id: "msg-1",
    role: "user",
    content: "Can you analyze yesterday's logs?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "msg-2",
    role: "assistant",
    content: "I've analyzed yesterday's logs. Found 3 warnings related to memory usage spikes around 2 PM, and 1 error in the payment processing module at 4:30 PM. The system recovered automatically within 30 seconds.",
    timestamp: new Date(Date.now() - 1000 * 60 * 29).toISOString(),
    agent: "System Agent",
  },
  {
    id: "msg-3",
    role: "user",
    content: "What was the cause of the payment error?",
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
  },
  {
    id: "msg-4",
    role: "assistant",
    content: "The payment error was caused by a temporary timeout connecting to the Stripe API. The service was experiencing latency issues at that time. I recommend implementing a retry mechanism with exponential backoff.",
    timestamp: new Date(Date.now() - 1000 * 60 * 24).toISOString(),
    agent: "System Agent",
  },
  {
    id: "msg-5",
    role: "user",
    content: "Can you create a task for that?",
    timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
  },
  {
    id: "msg-6",
    role: "assistant",
    content: "Done! I've created task #TASK-2047: 'Implement retry mechanism with exponential backoff for Stripe API calls'. It's been assigned to the Code Agent with high priority.",
    timestamp: new Date(Date.now() - 1000 * 60 * 19).toISOString(),
    agent: "Task Agent",
  },
];

export async function GET() {
  try {
    return NextResponse.json(mockChatHistory);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch chat history" },
      { status: 500 }
    );
  }
}