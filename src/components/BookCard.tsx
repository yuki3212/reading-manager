type Book = {
  id: number;
  title: string;
  author: string;
  rating: number;
  finished_at: string;
};

type BookCardProps = {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
};

export default function BookCard({
  book,
  onEdit,
  onDelete,
}: BookCardProps) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4">
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
          読了：{book.finished_at}
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => onEdit(book)}
            className="text-sm text-gray-600 hover:text-black"
          >
            編集
          </button>

          <button
            onClick={() => onDelete(book.id)}
            className="text-sm text-red-500 hover:text-red-700"
          >
            削除
          </button>
        </div>
      </div>
    </article>
  );
}