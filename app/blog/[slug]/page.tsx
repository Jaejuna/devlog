export default function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">{params.slug}</h1>
    </main>
  )
}
