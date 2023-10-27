"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Reply } from "lucide-react";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    content: z.string().min(1, {
        message: "Please enter your comment.",
    }),
});

export default function CommentReplay({
    parentCommentId,
}: {
    parentCommentId: string;
}) {
    const [isReplay, setIsReplay] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { data, status }: any = useSession();

    const router = useRouter();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (status === "authenticated") {
            try {
                setIsLoading(true);
                const res = await axios.post("/comment/replay", {
                    ...values,
                    commentId: parentCommentId,
                    userId: data?.user?.id,
                });

                if (res.status === 201) {
                    form.reset();
                    router.refresh();
                    setIsReplay(false);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        } else {
            return router.push("/auth");
        }
    }

    return (
        <div>
            <div className="pt-3">
                <button
                    onClick={() => setIsReplay(!isReplay)}
                    className="text-sm flex gap-1 items-center"
                >
                    <Reply className="text-stone-600" size={18} /> Replay
                </button>
            </div>
            {isReplay && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-3"
                    >
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Replay..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            )}
        </div>
    );
}
