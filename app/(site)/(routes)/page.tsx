import BlogSection from "@/app/(site)/_components/blog-section";

export default function Home({
    searchParams,
}: {
    searchParams: {
        page: number;
    };
}) {
    return <BlogSection page={searchParams.page || 1} />;
}
