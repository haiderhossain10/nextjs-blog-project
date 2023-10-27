import axios from "@/lib/axios";
import moment from "moment";
import Image from "next/image";
import CommentReplay from "./comment-replay";
import CommentReplayList from "./comment-replay-list";

// get comments by blog id
const getData = async (id: string) => {
    try {
        return await axios.get(`/comment/${id}`);
    } catch (error) {
        console.log(error);
    }
};

export default async function CommentList({ id }: { id: string }) {
    const { data }: any = await getData(id);

    return (
        <section className="space-y-4 mt-10 lg:ml-14">
            {data.map((comment: any) => (
                <div key={comment.id} className="flex gap-3">
                    <div>
                        <Image
                            height={50}
                            width={50}
                            src={comment.user.image}
                            alt="profile"
                            className="rounded-full object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-sm font-bold pb-1">
                            {comment.user.name}{" "}
                            <span className="text-sm font-normal text-stone-400">
                                {moment(comment.createdAt).fromNow()}
                            </span>
                        </p>
                        <p className="text-sm">{comment.content} </p>
                        <CommentReplay parentCommentId={comment.id} />
                        <CommentReplayList parentCommentId={comment.id} />
                    </div>
                </div>
            ))}
        </section>
    );
}
