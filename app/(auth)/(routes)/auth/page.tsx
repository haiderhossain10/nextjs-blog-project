"use client";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";

export default function Auth() {
    const { status } = useSession();

    // google auth handler
    const google = async () => {
        try {
            await signIn("google", {
                redirect: false,
                callbackUrl: "/",
            });
        } catch (error) {
            console.log(error);
        }
    };

    if (status === "unauthenticated") {
        return (
            <>
                <div className="text-center">
                    <h2 className="text-xl font-bold pb-4">Sign In</h2>
                    <Button className="rounded-full" onClick={google}>
                        Sign in with google
                    </Button>
                </div>
            </>
        );
    }
}
