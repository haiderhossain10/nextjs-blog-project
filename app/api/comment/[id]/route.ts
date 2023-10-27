import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
    request: Request,
    {
        params: { id },
    }: {
        params: {
            id: string;
        };
    }
) {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                blogId: id,
            },
            include: {
                user: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(comments);
    } catch (error) {
        return NextResponse.json(
            {
                error: "Something went wrong",
            },
            { status: 500 }
        );
    }
}
