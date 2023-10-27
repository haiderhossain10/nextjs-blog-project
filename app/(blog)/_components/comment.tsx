import CommentForm from "./comment-form";
import CommentList from "./comment-list";
import prisma from "@/lib/db";

export default async function Comment({ data }: { data: any }) {
    // get total comments
    const {
        _count: { _all },
    } = await prisma.comment.aggregate({
        where: { blogId: data?.id },
        _count: { _all: true },
    });

    const { user } = data;

    return (
        <section className="pt-8">
            <h2 className="text-1xl font-bold pb-4">Comments ({_all})</h2>
            <CommentForm image={user?.image} blogId={data?.id} />
            <CommentList id={data?.id} />
        </section>
    );
}
