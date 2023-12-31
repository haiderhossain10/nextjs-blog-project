import Comment from "@/app/(blog)/_components/comment";
import Content from "@/app/(blog)/_components/content";
import prisma from "@/lib/db";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Slug({
    params: { slug },
}: {
    params: { slug: string };
}) {
    // get signle blog post
    const single = await prisma.blog.findFirst({
        where: {
            slug: decodeURIComponent(slug),
        },
        include: {
            user: true,
        },
    });

    if (!single) {
        return redirect("/");
    }

    return (
        <div className="py-6">
            <div className="container">
                <div className="lg:w-6/12 mx-auto">
                    <h2 className="text-2xl font-bold pb-4">{single?.title}</h2>
                    <div className="flex gap-2 items-center">
                        <Link href={`/profile/${single?.user?.id}`}>
                            <Image
                                src={single?.user?.image!}
                                height={50}
                                width={50}
                                alt="profile"
                                className="rounded-full "
                            />
                        </Link>
                        <div>
                            <h4 className="text-sm text-stone-900 pb-1">
                                {single?.user?.name}
                            </h4>
                            <p className="text-sm text-stone-400 font-normal">
                                Published in{" "}
                                <span className="text-stone-900">
                                    {moment(single?.createdAt).format(
                                        "MMM Do YY"
                                    )}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="pt-8">
                        <Image
                            className="min-h-full max-h-[350px] w-full object-cover mb-4 object-center"
                            src={single?.imageUrl}
                            height={600}
                            width={600}
                            alt="Thumbnail"
                        />
                        <Content content={single?.content} />
                    </div>
                    <Comment data={single} />
                </div>
            </div>
        </div>
    );
}
