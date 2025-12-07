import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { id, name, userId } = await req.json();

    const proyect = await prisma.proyect.create({
      data: {
        id,
        name,
        userId,
      },
    });

    return NextResponse.json(proyect, { status: 201 });
  } catch (error) {
    console.error("Error creating proyect:", error);
    return NextResponse.json(
      { error: "Failed to create proyect" },
      { status: 500 },
    );
  }
}
