'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { data: session } = useSession();
    const router = useRouter();

    const submitPost = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const body = { title, content };
            await fetch('/api/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            await router.push('/drafts');
        } catch (error) {
            console.error(error);
        }
    };

    if (!session) {
        return <p>You need to be logged in to create a post.</p>;
    }

    return (
        <form onSubmit={submitPost} className="p-4">
            <h1 className="text-2xl font-bold mb-4">Create Post</h1>
            <input
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                type="text"
                value={title}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <textarea
                cols={50}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
                rows={8}
                value={content}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button
                disabled={!content || !title}
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
            >
                Create
            </button>
        </form>
    );
}
