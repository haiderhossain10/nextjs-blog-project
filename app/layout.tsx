import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const merriweather = Merriweather({
    subsets: ["cyrillic"],
    weight: ["300", "700"],
});

export const metadata: Metadata = {
    title: "Blog Project",
    description: "This is a blog project buit in next js.",
};

export default function RootLayout({
    children,
    session,
}: {
    children: React.ReactNode;
    session: any;
}) {
    return (
        <html lang="en">
            <body className={merriweather.className}>
                <Providers session={session}>{children}</Providers>
            </body>
        </html>
    );
}
