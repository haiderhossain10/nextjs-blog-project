import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const replay = await prisma.commentReplay.create({
            data: {
                content: body.content,
                userId: body.userId,
                commentId: body.commentId,
            },
        });

        return NextResponse.json(replay, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Something went wrong",
            },
            { status: 500 }
        );
    }
}
