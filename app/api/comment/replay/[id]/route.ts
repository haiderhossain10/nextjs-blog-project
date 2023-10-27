import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
    request: Request,
    { params: { id } }: { params: { id: string } }
) {
    try {
        const replayComments = await prisma.commentReplay.findMany({
            where: {
                commentId: id,
            },
            include: {
                user: true,
            },
        });

        return NextResponse.json(replayComments, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Something went wrong",
            },
            { status: 500 }
        );
    }
}
