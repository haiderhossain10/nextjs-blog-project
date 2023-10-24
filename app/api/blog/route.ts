import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { z } from "zod";
import { type NextRequest } from "next/server";

const schema = z.object({
    title: z.string().min(1, "Title is required"),
    imageUrl: z.string().min(1, "Image URL is required"),
    content: z.string().min(1, "Content is required"),
    userId: z.string().min(1, "User ID is required"),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const validation = schema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    error: validation.error.errors,
                },
                { status: 400 }
            );
        }

        const slugUrl: string = slugify(body.title, {
            replacement: "-",
            lower: true,
        });

        const blogExists = await prisma.blog.findFirst({
            where: {
                slug: slugUrl,
            },
        });

        if (blogExists) {
            return NextResponse.json(
                {
                    error: "Blog already exists",
                },
                { status: 400 }
            );
        }

        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                slug: slugUrl,
                imageUrl: body.imageUrl,
                content: body.content,
                userId: body.userId,
            },
        });

        return NextResponse.json(blog, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Something went wrong",
            },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const page: any = searchParams.get("page") || 1;

        const skip = (page - 1) * 2;

        const blogs = await prisma.blog.findMany({
            include: {
                user: true,
            },
            skip,
            take: 2,
            orderBy: {
                createdAt: "desc",
            },
        });

        const count = await prisma.blog.count();

        return NextResponse.json({ data: blogs, count }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Something went wrong",
            },
            { status: 500 }
        );
    }
}
