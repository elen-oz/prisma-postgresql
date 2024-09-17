export default function Post({ params }: { params: { id: string } }) {
    // Здесь будет логика для получения конкретного поста
    const post = {
        id: params.id,
        title: `Пост ${params.id}`,
        content: `Содержание поста ${params.id}`
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <p>{post.content}</p>
        </div>
    )
}