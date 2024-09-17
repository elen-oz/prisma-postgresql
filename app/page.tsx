import Link from 'next/link'
import prisma from '../lib/prisma'
import AuthButton from '@/components/AuthButton'

export default async function Home() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        include: { author: true },
    })

    return (
        <main className="p-4">
            <AuthButton />
            <h1 className="text-3xl font-bold mb-4">Мой блог</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id} className="mb-2">
                        <Link href={`/posts/${post.id}`} className="text-blue-500 hover:underline">
                            {post.title}
                        </Link>
                        {post.author?.name && <p className="text-sm text-gray-500">By: {post.author.name}</p>}
                    </li>
                ))}
            </ul>
        </main>
    )
}