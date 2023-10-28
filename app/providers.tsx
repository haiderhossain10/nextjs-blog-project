"use client";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import NavSidebar from "@/components/sidebar/nav-sidebar";
import { SessionProvider } from "next-auth/react";

export default function Providers({
    children,
    session,
}: {
    children: React.ReactNode;
    session: any;
}) {
    return (
        <>
            <SessionProvider session={session}>
                <Header />
                {children}
                <Footer />
                <NavSidebar />
            </SessionProvider>
        </>
    );
}
