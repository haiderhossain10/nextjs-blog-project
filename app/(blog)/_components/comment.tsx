import CommentForm from "./comment-form";
import CommentList from "./comment-list";
import prisma from "@/lib/db";

export default async function Comment({ data }: { data: any }) {
    // get total comments
    const totalComments = await prisma.comment.count({
        where: {
            blogId: data?.id,
        },
    });

    const totalReplies = await prisma.commentReplay.count({
        where: {
            comment: {
                blogId: data?.id,
            },
        },
    });

    const { user } = data;

    return (
        <section className="pt-8">
            <h2 className="text-1xl font-bold pb-4">
                Comments ({totalComments + totalReplies})
            </h2>
            <CommentForm image={user?.image} blogId={data?.id} />
            <CommentList id={data?.id} />
        </section>
    );
}
