'use client';

import { useRouter } from 'next/navigation';

export default function PublishPostButton({ postId }: { postId: string }) {
    const router = useRouter();

    const publishPost = async () => {
        try {
            await fetch(`/api/publish/${postId}`, {
                method: 'PUT',
            });
            router.refresh();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button
            onClick={publishPost}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
            Publish
        </button>
    );
}