export interface InterfaceBlogsProps {
    id: string;
    userId: string;
    title: string;
    content: string;
    createdAt: string;
    imageUrl: string;
    slug: string;
    updatedAt: string;
    user: {
        id: string;
        name: string;
        email: string;
        emailVerified: string | null;
        image: string;
    };
}

export interface InterfaceBlogProps {
    data: InterfaceBlogsProps;
    count: number;
}
