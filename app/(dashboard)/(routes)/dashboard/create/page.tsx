"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FileInput from "../_components/file-input";
import EditorInput from "../_components/editor-input";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Tiltle is required",
    }),
    imageUrl: z.string().min(1, {
        message: "Image is required",
    }),
    content: z.string().min(1, {
        message: "Content is required",
    }),
});

export default function Create() {
    const [isLoading, setLoading] = useState<boolean>(false);

    const {
        data: { user },
    }: any = useSession();

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageUrl: "",
            title: "",
            content: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            const res = await axios.post("/blog", {
                ...values,
                userId: user.id,
            });

            if (res.status === 201) {
                form.reset();
                router.refresh();
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="pt-4 pb-20">
            <div className="container">
                <div className="lg:w-6/12 mx-auto">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <div className="flex lg:flex-row flex-col gap-2">
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Upload Image</FormLabel>
                                            <FormControl>
                                                <FileInput field={field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Write Post</FormLabel>
                                        <FormControl>
                                            <EditorInput field={field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button disabled={isLoading} type="submit">
                                Post
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
