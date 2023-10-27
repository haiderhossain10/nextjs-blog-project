"use client";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { status } = useSession();

    const router = useRouter();

    if (status === "loading") return null;

    if (status === "authenticated") {
        return router.back();
    }

    return (
        <>
            <section className="flex py-10 justify-center h-full">
                {children}
            </section>
        </>
    );
}
