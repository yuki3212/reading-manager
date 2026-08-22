"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import BookCard from "@/components/BookCard";
import BookForm from "@/components/BookForm";

type Book = {
  id: number;
  title: string;
  author: string;
  rating: number;
  finished_at: string;
};

type BookInput = {
  title: string;
  author: string;
  rating: number;
  finished_at: string;
};

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("本の取得に失敗しました:", error);
        return;
      }

      setBooks(data);
    };

    loadBooks();
  }, []);

  const handleOpenAddForm = () => {
    setEditingBook(null);
    setIsFormOpen(true);
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setEditingBook(null);
    setIsFormOpen(false);
  };

  const handleSubmit = async (bookInput: BookInput) => {
    if (editingBook) {
      const { data, error } = await supabase
        .from("books")
        .update(bookInput)
        .eq("id", editingBook.id)
        .select()
        .single();

      if (error) {
        console.error("本の更新に失敗しました:", error);
        return;
      }

      setBooks((currentBooks) =>
        currentBooks.map((book) =>
          book.id === editingBook.id ? data : book,
        ),
      );
    } else {
      const { data, error } = await supabase
        .from("books")
        .insert(bookInput)
        .select()
        .single();

      if (error) {
        console.error("本の追加に失敗しました:", error);
        return;
      }

      setBooks((currentBooks) => [data, ...currentBooks]);
    }

    handleCancel();
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("この本を削除しますか？");

    if (!confirmed) {
      return;
    }

    const { error } = await supabase
      .from("books")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("本の削除に失敗しました:", error);
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
            onClick={handleOpenAddForm}
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
          >
            本を追加
          </button>
        </div>

        {isFormOpen && (
          <BookForm
            editingBook={editingBook}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}

        <section className="space-y-3">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </section>
      </div>
    </main>
  );
}