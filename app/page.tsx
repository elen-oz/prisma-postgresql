import Link from 'next/link'

export default function Home() {
  // Здесь будет логика для получения постов
  const posts = [
    { id: 1, title: 'Первый пост', content: 'Содержание первого поста' },
    { id: 2, title: 'Второй пост', content: 'Содержание второго поста' },
  ]

  return (
      <main className="p-4">
        <h1 className="text-3xl font-bold mb-4">Мой блог</h1>
        <ul>
          {posts.map((post) => (
              <li key={post.id} className="mb-2">
                <Link href={`/posts/${post.id}`} className="text-blue-500 hover:underline">
                  {post.title}
                </Link>
              </li>
          ))}
        </ul>
      </main>
  )
}