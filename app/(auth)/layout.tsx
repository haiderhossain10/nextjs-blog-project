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
        return router.push("/");
    }

    return (
        <>
            <section className="flex pt-10 pb-5 justify-center items-center">
                {children}
            </section>
        </>
    );
}
