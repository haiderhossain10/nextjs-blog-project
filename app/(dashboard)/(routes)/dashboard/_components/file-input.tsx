"use client";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { CldImage, CldUploadButton } from "next-cloudinary";

export default function FileInput({ field }: { field: any }) {
    const [imageId, setImageId] = useState<string | null>(null);
    return (
        <div>
            {imageId && (
                <CldImage
                    width="960"
                    height="600"
                    src={imageId}
                    sizes="100vw"
                    alt="Description of my image"
                    className="w-full h-64 object-cover rounded-lg border mb-4"
                />
            )}
            {!imageId && (
                <CldUploadButton
                    uploadPreset="jngfvio8"
                    onUpload={(e: any) => {
                        setImageId(e?.info?.public_id);
                        field.onChange(e?.info?.url);
                    }}
                >
                    <Button type="button" variant={"destructive"}>
                        <UploadCloud className="mr-2" />
                        Upload
                    </Button>
                </CldUploadButton>
            )}
        </div>
    );
}
