const books = [
  {
    title: "コンビニ人間",
    author: "村田沙耶香",
    rating: 4,
    finishedAt: "2026/08/10",
  },
  {
    title: "悪意",
    author: "東野圭吾",
    rating: 5,
    finishedAt: "2026/08/05",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            読書管理
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            読んだ本を記録する
          </p>
        </header>

        <div className="mb-6 flex justify-end">
          <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white">
            本を追加
          </button>
        </div>

        <section className="space-y-3">
          {books.map((book) => (
            <article
              key={book.title}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {book.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {book.author}
                  </p>
                </div>

                <p className="text-sm text-gray-600">
                  {"★".repeat(book.rating)}
                  {"☆".repeat(5 - book.rating)}
                </p>
              </div>

              <p className="mt-3 text-xs text-gray-400">
                読了：{book.finishedAt}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}