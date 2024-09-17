import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Drafts() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin');
    }

    const drafts = await prisma.post.findMany({
        where: {
            author: { email: session.user?.email },
            published: false,
        },
        include: {
            author: {
                select: { name: true },
            },
        },
    });

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">My Drafts</h1>
            {drafts.map((post) => (
                <div key={post.id} className="mb-4">
                    <Link href={`/posts/${post.id}`} className="text-xl text-blue-500 hover:underline">
                        {post.title}
                    </Link>
                    <p className="text-gray-500">By {post.author?.name || 'Unknown author'}</p>
                </div>
            ))}
        </div>
    );
}