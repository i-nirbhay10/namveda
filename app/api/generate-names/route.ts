import { type NextRequest, NextResponse } from "next/server"
import { generateNames } from "@/lib/ai-generator"

export async function POST(request: NextRequest) {
  try {
    const filters = await request.json()
    const names = await generateNames(filters)

    return NextResponse.json({ names })
  } catch (error) {
    console.error("Error in generate-names API:", error)
    return NextResponse.json({ error: "Failed to generate names" }, { status: 500 })
  }
}
