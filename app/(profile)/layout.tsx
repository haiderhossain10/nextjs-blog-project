"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <div>Checking...</div>;
    }

    if (status === "unauthenticated") {
        return router.back();
    }

    return (
        <>
            <section>{children}</section>
        </>
    );
}
