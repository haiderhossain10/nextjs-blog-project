"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import navigations from "@/data/navigations";
import { useNavStore } from "@/hooks/stores/nav-toggle";
import { cn } from "@/lib/utils";
import Link from "next/link";
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
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function NavSidebar() {
    const { data, status } = useSession();
    const isActive: boolean = useNavStore((state: any) => state.isActive);
    const toggle = useNavStore((state: any) => state.toggle);
    const path = usePathname();

    return (
        <Sheet open={isActive} onOpenChange={() => toggle()}>
            <SheetContent side={"left"}>
                <nav>
                    <ul className="flex flex-col gap-3">
                        {navigations.map(
                            (navigation, i) =>
                                (!navigation.protected ||
                                    (status === "authenticated" &&
                                        navigation.protected)) && (
                                    <Link
                                        onClick={() => toggle()}
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
                </nav>{" "}
                {status !== "authenticated" && status !== "loading" && (
                    <Link onClick={() => toggle()} href="/auth">
                        <Button>Register / Login</Button>
                    </Link>
                )}
                <div className="mt-5">
                    {status === "authenticated" && (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src={data?.user?.image!} />
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
                                    <Link
                                        onClick={() => toggle()}
                                        href="/profile"
                                    >
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link
                                        onClick={() => toggle()}
                                        href="/dashboard/create"
                                    >
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
            </SheetContent>
        </Sheet>
    );
}
