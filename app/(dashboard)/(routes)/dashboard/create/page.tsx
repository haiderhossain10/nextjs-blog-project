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
import { CldUploadWidget } from "next-cloudinary";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Tiltle is required",
    }),
});

export default function Create() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }
    return (
        <div className="py-4">
            <div className="container">
                <div className="w-6/12 mx-auto">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                <CldUploadWidget signatureEndpoint="<API Endpoint (ex: /api/sign-cloudinary-params)>">
                                    {({ open }) => {
                                        function handleOnClick(e: any) {
                                            e.preventDefault();
                                            console.log(e);

                                            open();
                                        }
                                        return (
                                            <button
                                                className="button"
                                                onClick={handleOnClick}
                                            >
                                                Upload an Image
                                            </button>
                                        );
                                    }}
                                </CldUploadWidget>
                            </div>
                            <Button type="submit">Post</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
