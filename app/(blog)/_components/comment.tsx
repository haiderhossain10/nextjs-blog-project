import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function Comment({ data }: { data: any }) {
    return (
        <section className="pt-8">
            <h2 className="text-1xl font-bold pb-4">Comments (0)</h2>
            <div className="flex gap-3">
                <div>
                    <Image
                        height={50}
                        width={50}
                        src={data.image}
                        alt="profile"
                        className="rounded-full object-cover"
                    />
                </div>
                <Textarea placeholder="Type your message here." />
            </div>
        </section>
    );
}
