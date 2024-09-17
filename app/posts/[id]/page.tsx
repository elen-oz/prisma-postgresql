import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import DeletePostButton from '@/components/DeletePostButton';
import PublishPostButton from '@/components/PublishPostButton';

export default async function Post({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    const post = await prisma.post.findUnique({
        where: { id: params.id },
        include: { author: true },
    });

    if (!post) {
        notFound();
    }

    const userHasValidSession = Boolean(session);
    const postBelongsToUser = session?.user?.email === post.author?.email;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                {post.title} {!post.published && '(Draft)'}
            </h1>
            <p className="mb-4">By {post.author?.name || 'Unknown author'}</p>
            <div className="prose mb-4">{post.content}</div>
            {!post.published && userHasValidSession && postBelongsToUser && (
                <PublishPostButton postId={post.id} />
            )}
            {userHasValidSession && postBelongsToUser && (
                <DeletePostButton postId={post.id} />
            )}
        </div>
    );
}