"use client";
import navigations from "@/data/navigations";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlignJustify } from "lucide-react";
import { useNavStore } from "@/hooks/stores/nav-toggle";

export default function Header() {
    const toggle = useNavStore((state: any) => state.toggle);
    const { data, status } = useSession();

    const path = usePathname();

    return (
        <>
            <header className="py-4 border-b border-b-stone-200">
                <div className="container">
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <h2 className="text-2xl font-bold">Medium</h2>
                        </Link>
                        <div className="lg:flex items-center gap-6 hidden">
                            <nav>
                                <ul className="flex items-center gap-3">
                                    {navigations.map(
                                        (navigation, i) =>
                                            (!navigation.protected ||
                                                (status === "authenticated" &&
                                                    navigation.protected)) && (
                                                <Link
                                                    className={cn(
                                                        "text-sm font-normal",
                                                        path === navigation.path
                                                            ? "text-stone-900"
                                                            : "text-stone-500"
                                                    )}
                                                    key={i}
                                                    href={navigation.path}
                                                >
                                                    {navigation.label}
                                                </Link>
                                            )
                                    )}
                                </ul>
                            </nav>
                            {status !== "authenticated" &&
                                status !== "loading" && (
                                    <Link href="/auth">
                                        <Button>Register / Login</Button>
                                    </Link>
                                )}

                            {status === "authenticated" && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar>
                                            <AvatarImage
                                                src={data?.user?.image!}
                                            />
                                            <AvatarFallback>
                                                {data?.user?.name}
                                            </AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>
                                            My Account
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Link href="/profile">Profile</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href="/dashboard/create">
                                                Create Post
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Button
                                                onClick={() =>
                                                    confirm("Are you sure?") &&
                                                    signOut({
                                                        callbackUrl: "/auth",
                                                    })
                                                }
                                                variant={"destructive"}
                                                className="w-full"
                                            >
                                                Logout
                                            </Button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                        <button onClick={() => toggle()} className="lg:hidden">
                            <AlignJustify />
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}
