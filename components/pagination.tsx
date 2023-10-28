"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Pagination({ pageCount }: { pageCount: number }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const page = searchParams.get("page");

    const currentPage = Number(page) || 1;

    // generate pagination numbers
    const paginate = [];
    for (let number = currentPage - 3; number <= currentPage + 2; number++) {
        if (number < 1) continue;
        if (number > pageCount) break;
        paginate.push(number);
    }

    return (
        <div className="flex flex-wrap items-center gap-4">
            <Button
                variant={"outline"}
                disabled={currentPage <= 1}
                onClick={() => router.push(`/?page=${currentPage - 1}`)}
            >
                <ArrowLeft size={18} />
            </Button>

            {paginate.map((page) => (
                <Link
                    key={page}
                    className={cn(
                        currentPage === page
                            ? "text-stone-700 font-bold"
                            : "text-stone-400 hover:text-stone-700"
                    )}
                    href={`/?page=${page}`}
                >
                    {page}
                </Link>
            ))}

            <Button
                variant={"outline"}
                disabled={currentPage >= pageCount}
                onClick={() => router.push(`/?page=${currentPage + 1}`)}
            >
                <ArrowRight size={18} />
            </Button>
        </div>
    );
}
