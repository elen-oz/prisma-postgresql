'use client';

import { useRouter } from 'next/navigation';

export default function DeletePostButton({ postId }: { postId: string }) {
    const router = useRouter();

    const deletePost = async () => {
        try {
            await fetch(`/api/post/${postId}`, {
                method: 'DELETE',
            });
            router.push('/');
            router.refresh();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button
            onClick={deletePost}
            className="bg-red-500 text-white px-4 py-2 rounded"
        >
            Delete
        </button>
    );
}