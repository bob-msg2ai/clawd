import { NextResponse } from "next/server";
import type { RevenueData } from "@/types";

const mockRevenue: RevenueData[] = [
  { date: "2024-01-01", amount: 1250, source: "subscriptions" },
  { date: "2024-01-02", amount: 890, source: "subscriptions" },
  { date: "2024-01-03", amount: 2100, source: "enterprise" },
  { date: "2024-01-04", amount: 1450, source: "subscriptions" },
  { date: "2024-01-05", amount: 3200, source: "enterprise" },
  { date: "2024-01-06", amount: 980, source: "subscriptions" },
  { date: "2024-01-07", amount: 1150, source: "subscriptions" },
];

export async function GET() {
  try {
    return NextResponse.json(mockRevenue);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch revenue data" },
      { status: 500 }
    );
  }
}