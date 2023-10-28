import axios from "@/lib/axios";
import moment from "moment";
import Image from "next/image";

const replayComments = async (id: string) => {
    try {
        return await axios.get(`/comment/replay/${id}`);
    } catch (error) {
        console.log(error);
    }
};

export default async function CommentReplayList({
    parentCommentId,
}: {
    parentCommentId: string;
}) {
    const { data: comments }: any = await replayComments(parentCommentId);

    return (
        <div className="pt-4 space-y-4">
            {comments.map((replay: any) => (
                <div key={replay.id} className="flex gap-3">
                    <div>
                        <Image
                            height={50}
                            width={50}
                            src={replay.user.image}
                            alt="profile"
                            className="rounded-full object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-sm font-bold pb-1">
                            {replay.user.name}{" "}
                            <span className="text-sm font-normal text-stone-400">
                                {moment(replay.createdAt).fromNow()}
                            </span>
                        </p>
                        <p className="text-sm">{replay.content} </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
