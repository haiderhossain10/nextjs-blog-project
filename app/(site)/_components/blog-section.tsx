import BlogCard from "@/components/blog-card";
import Pagination from "@/components/pagination";
import axios from "@/lib/axios";

// fetch data from api
async function getData({ page }: { page: number }) {
    try {
        return await axios.get(`/blog?page=${page}`);
    } catch (error) {
        console.log(error);
    }
}

export default async function BlogSection({ page }: { page: number }) {
    const {
        data: { data, count },
    }: any = await getData({ page });

    // total pages count
    const pageCount = Math.ceil(count / 2);

    let content;

    if (data?.length === 0) {
        content = (
            <div className="flex justify-center items-center h-[300px]">
                <h2 className="text-2xl font-bold">No post found</h2>
            </div>
        );
    } else {
        content = (
            <div>
                {data?.map((item: any) => (
                    <BlogCard key={item.id} data={item} />
                ))}
                <div className="mt-6">
                    <Pagination pageCount={pageCount} />
                </div>
            </div>
        );
    }

    return (
        <div className="py-6">
            <div className="container">
                <div className="lg:w-6/12 mx-auto">{content}</div>
            </div>
        </div>
    );
}
