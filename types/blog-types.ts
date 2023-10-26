export interface InterfaceBlogsProps {
    data: {
        id: string;
        title: string;
        slug: string;
        imageUrl: string;
        content: string;
        createdAt: string;
        user: {
            id: string;
            name: string;
            image: string;
        };
    }[];
    count: number;
}

export interface InterfaceBlogProps {
    data: InterfaceBlogsProps["data"];
    count: number;
}
