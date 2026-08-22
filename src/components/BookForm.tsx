"use client";

import { useState } from "react";

type Book = {
  id: number;
  title: string;
  author: string;
  rating: number;
  finished_at: string;
};

type BookFormProps = {
  editingBook: Book | null;
  onSubmit: (book: {
    title: string;
    author: string;
    rating: number;
    finished_at: string;
  }) => void;
  onCancel: () => void;
};

export default function BookForm({
  editingBook,
  onSubmit,
  onCancel,
}: BookFormProps) {
  const [title, setTitle] = useState(editingBook?.title ?? "");
  const [author, setAuthor] = useState(editingBook?.author ?? "");
  const [rating, setRating] = useState(editingBook?.rating ?? 5);
  const [finishedAt, setFinishedAt] = useState(
    editingBook?.finished_at ??
      new Date().toISOString().split("T")[0],
  );

  const handleSubmit = () => {
    if (!title.trim() || !author.trim() || !finishedAt) {
      return;
    }

    onSubmit({
      title: title.trim(),
      author: author.trim(),
      rating,
      finished_at: finishedAt,
    });
  };

  return (
    <section className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        {editingBook ? "本を編集" : "本を追加"}
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
            {editingBook ? "保存" : "追加"}
          </button>

          <button
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
          >
            キャンセル
          </button>
        </div>
      </div>
    </section>
  );
}