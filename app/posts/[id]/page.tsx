import prisma from '../../../lib/prisma'

export default async function Post({ params }: { params: { id: string } }) {
    const post = await prisma.post.findUnique({
        where: { id: params.id },
        include: { author: true },
    })

    if (!post) {
        return <div>Post not found</div>
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <p className="mb-2">{post.content}</p>
            {post.author?.name && <p className="text-sm text-gray-500">By: {post.author.name}</p>}
        </div>
    )
}