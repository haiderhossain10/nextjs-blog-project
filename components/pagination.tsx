"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Pagination({ pageCount }: { pageCount: number }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const page = searchParams.get("page");

    const currentPage = Number(page) || 1;

    return (
        <div className="flex flex-wrap items-center gap-4">
            <Button
                disabled={currentPage <= 1}
                onClick={() => router.push(`?page=${currentPage - 1}`)}
            >
                Prev
            </Button>

            {new Array(pageCount).fill(pageCount).map((_, i) => (
                <Link
                    className={cn(
                        currentPage === i + 1 && "text-blue-600 underline"
                    )}
                    key={i}
                    href={`?page=${i + 1}`}
                >
                    {i + 1}
                </Link>
            ))}

            <Button
                disabled={currentPage >= pageCount}
                onClick={() => router.push(`?page=${currentPage + 1}`)}
            >
                Next
            </Button>
        </div>
    );
}
