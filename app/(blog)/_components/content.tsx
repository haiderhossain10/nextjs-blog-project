"use client";
import { useEffect, useState } from "react";

export default function Content({ content }: { content: string }) {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <p
            style={{ all: "unset" }}
            dangerouslySetInnerHTML={{
                __html: content,
            }}
        ></p>
    );
}
