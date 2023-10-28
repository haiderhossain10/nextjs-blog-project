"use client";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { InterfaceBlogsProps } from "@/types/blog-types";
import { useEffect, useState } from "react";

export default function BlogCard({ data }: { data: InterfaceBlogsProps }) {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const stripHtmlTags = (html: string) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        console.log(html);

        return doc.body.textContent || "";
    };
    const len = stripHtmlTags(data.content).length;
    const maxLen = 150;

    return (
        <div className="border-b border-stone-300 pb-6 pt-6 first-of-type:pt-0">
            <div className="flex items-center gap-2">
                <button>
                    <Image
                        src={data.user.image}
                        height={24}
                        width={24}
                        alt="profile"
                        className="rounded-full"
                    />
                </button>
                <p className="text-[10px] font-medium">{data.user.name},</p>
                <p className="text-[10px] font-medium text-stone-500">
                    {moment(data.createdAt).format("MMM Do YY")}
                </p>
            </div>
            <h2 className="text-xl font-bold py-3">
                <Link className="underline" href={`/blog/${data.slug}`}>
                    {data.title}{" "}
                </Link>
            </h2>

            {len > maxLen
                ? stripHtmlTags(data.content).substring(
                      0,
                      stripHtmlTags(data.content).indexOf(" ", maxLen)
                  ) + " ..."
                : stripHtmlTags(data.content)}
        </div>
    );
}
