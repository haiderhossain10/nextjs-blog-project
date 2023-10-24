import Image from "next/image";
import moment from "moment";
import Link from "next/link";

interface Props {
    data: {
        id: string;
        title: string;
        slug: string;
        imageUrl: string;
        content: string;
        createdAt: string;
        user: {
            id: string;
            name: string;
            image: string;
        };
    };
}

export default function BlogCard({ data }: Props) {
    const len = data.content.length;

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

            <p>
                {len > 100
                    ? data.content.substring(0, 100) + "..."
                    : data.content}
            </p>
        </div>
    );
}
