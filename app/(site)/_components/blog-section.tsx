"use client";
import BlogCard from "@/components/blog-card";
import Pagination from "@/components/pagination";
import axios from "@/lib/axios";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

// fetch data from api
const getData = async (page: number) => {
    try {
        const res = await axios.get(`/blog?page=${page}`);

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export default async function BlogSection() {
    const searchParams = useSearchParams();
    const page = searchParams.get("page");
    const router = useRouter();

    // get data from api
    const { data, count } = await getData(Number(page) || 1);

    // total pages count
    const pageCount = Math.ceil(count / 2);

    return (
        <div className="py-6">
            <div className="container">
                <div className="lg:w-6/12 mx-auto">
                    <div>
                        {data &&
                            data?.map((item: any) => (
                                <BlogCard key={item.id} data={item} />
                            ))}
                        <div className="mt-6">
                            <Pagination pageCount={pageCount} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
