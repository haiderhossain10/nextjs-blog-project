"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReactPaginate from "react-paginate";

interface Props {
    pageCount: number;
    handlePageClick: (event: any) => void;
    page: number | string;
}

export default function Pagination({
    pageCount,
    handlePageClick,
    page,
}: Props) {
    return (
        <ReactPaginate
            className="flex items-center gap-3 mt-10"
            breakLabel="..."
            nextLabel={<ArrowRight size={16} />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={<ArrowLeft size={16} />}
            forcePage={page ? Number(page) - 1 : 0}
            previousLinkClassName="bg-stone-900 h-8 w-8 flex items-center justify-center text-white"
            nextLinkClassName="bg-stone-900 h-8 w-8 flex items-center justify-center text-white"
            activeLinkClassName="text-blue-600"
            disabledLinkClassName="bg-stone-400"
        />
    );
}
