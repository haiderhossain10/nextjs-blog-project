interface InterfaceUserProps {
    id: string;
    name: string;
    email: string;
    emailVerified: string | null;
    image: string;
}

interface InterfaceCommentsProps {
    id: string;
    userId: string;
    blogId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    user: InterfaceUserProps;
}
