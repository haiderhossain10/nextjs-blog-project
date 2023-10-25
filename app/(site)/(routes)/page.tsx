import BlogSection from "@/app/(site)/_components/blog-section";

export default function Home({ searchParams }: { searchParams: any }) {
    return <BlogSection page={searchParams.page || 1} />;
}
