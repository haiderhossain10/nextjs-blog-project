import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const created = await prisma.comment.create({
            data: {
                ...body,
            },
        });

        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Something went wrong",
            },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    try {
        const comments = await prisma.comment.findMany({
            include: { blog: true, user: true },
        });
        return NextResponse.json(comments, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Something went wrong",
            },
            { status: 500 }
        );
    }
}
