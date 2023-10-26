export interface InterfaceBlogsProps {
    title: string;
    content: string;
    createdAt: string;
    id: string;
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
    userId: string;
}

export interface InterfaceBlogProps {
    data: InterfaceBlogsProps;
    count: number;
}
