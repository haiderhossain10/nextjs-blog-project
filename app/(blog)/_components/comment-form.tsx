"use client";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    content: z.string().min(1, {
        message: "Please enter a message.",
    }),
});

export default function CommentForm({
    image,
    blogId,
}: {
    image: string;
    blogId: string;
}) {
    const { data: data, status }: any = useSession();
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
                const res = await axios.post("/comment", {
                    ...values,
                    userId: data?.user?.id,
                    blogId,
                });

                if (res.status === 201) {
                    form.reset();
                    router.refresh();
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
        <div className="flex gap-3 items-center">
            <div>
                <Image
                    height={50}
                    width={50}
                    src={image}
                    alt="profile"
                    className="rounded-full object-cover"
                />
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2 w-full"
                >
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        {...field}
                                        placeholder="Type your message here."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
}
