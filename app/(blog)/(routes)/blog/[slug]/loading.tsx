import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="mt-6">
            <div className="container ">
                <div className="lg:w-6/12 mx-auto">
                    <div className="space-y-8">
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-4 w-full lg:w-[200px]" />
                        </div>
                        <div className="flex flex-row items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full lg:w-[250px]" />
                                <Skeleton className="h-4 w-full lg:w-[200px]" />
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-4 w-full lg:w-[200px]" />
                        </div>
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-4 w-full lg:w-[200px]" />
                        </div>
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-4 w-full lg:w-[200px]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
