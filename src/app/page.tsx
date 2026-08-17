"use client";

import { useState } from "react";

type Book = {
  id: number;
  title: string;
  author: string;
  rating: number;
  finishedAt: string;
};

const initialBooks: Book[] = [
  {
    id: 1,
    title: "コンビニ人間",
    author: "村田沙耶香",
    rating: 4,
    finishedAt: "2026-08-10",
  },
  {
    id: 2,
    title: "悪意",
    author: "東野圭吾",
    rating: 5,
    finishedAt: "2026-08-05",
  },
];

export default function Home() {
  const [books, setBooks] = useState<Book[]>(initialBooks);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBookId, setEditingBookId] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [finishedAt, setFinishedAt] = useState("");

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setRating(5);
    setFinishedAt("");
    setEditingBookId(null);
    setIsFormOpen(false);
  };

  const handleSubmit = () => {
    if (!title.trim() || !author.trim() || !finishedAt) {
      return;
    }

    if (editingBookId !== null) {
      setBooks((currentBooks) =>
        currentBooks.map((book) =>
          book.id === editingBookId
            ? {
                ...book,
                title: title.trim(),
                author: author.trim(),
                rating,
                finishedAt,
              }
            : book,
        ),
      );
    } else {
      const newBook: Book = {
        id: Date.now(),
        title: title.trim(),
        author: author.trim(),
        rating,
        finishedAt,
      };

      setBooks((currentBooks) => [...currentBooks, newBook]);
    }

    resetForm();
  };

  const handleEdit = (book: Book) => {
    setEditingBookId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setRating(book.rating);
    setFinishedAt(book.finishedAt);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm("この本を削除しますか？");

    if (!confirmed) {
      return;
    }

    setBooks((currentBooks) =>
      currentBooks.filter((book) => book.id !== id),
    );
  };

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
          <button
            onClick={() => {
              resetForm();
              setIsFormOpen(true);
            }}
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
          >
            本を追加
          </button>
        </div>

        {isFormOpen && (
          <section className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              {editingBookId !== null ? "本を編集" : "本を追加"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  タイトル
                </label>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="例：容疑者Xの献身"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  著者
                </label>
                <input
                  value={author}
                  onChange={(event) => setAuthor(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="例：東野圭吾"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  評価
                </label>
                <select
                  value={rating}
                  onChange={(event) =>
                    setRating(Number(event.target.value))
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                >
                  <option value={5}>★★★★★</option>
                  <option value={4}>★★★★☆</option>
                  <option value={3}>★★★☆☆</option>
                  <option value={2}>★★☆☆☆</option>
                  <option value={1}>★☆☆☆☆</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  読了日
                </label>
                <input
                  type="date"
                  value={finishedAt}
                  onChange={(event) =>
                    setFinishedAt(event.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSubmit}
                  className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
                >
                  {editingBookId !== null ? "保存" : "追加"}
                </button>

                <button
                  onClick={resetForm}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </section>
        )}

        <section className="space-y-3">
          {books.map((book) => (
            <article
              key={book.id}
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

              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs text-gray-400">
                  読了：{book.finishedAt}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(book)}
                    className="text-sm text-gray-600 hover:text-black"
                  >
                    編集
                  </button>

                  <button
                    onClick={() => handleDelete(book.id)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    削除
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}