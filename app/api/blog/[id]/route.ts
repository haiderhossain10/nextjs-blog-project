import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function DELETE(
    request: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    try {
        const blog = await prisma.blog.delete({
            where: {
                id,
            },
        });

        return NextResponse.json(blog, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Something went wrong",
            },
            { status: 500 }
        );
    }
}
