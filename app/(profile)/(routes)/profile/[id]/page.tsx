export default function ProfileSingle({
    params: { id },
}: {
    params: { id: string };
}) {
    return <div>{id}</div>;
}
