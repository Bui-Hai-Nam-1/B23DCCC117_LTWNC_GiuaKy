import { memo } from "react";
import type { Book } from "./booksTypes";

interface BookCardProps {
  book: Book;
  isBorrowed: boolean;
  onBorrow: (id: string) => void;
  onReturn: (id: string) => void;
}

function BookCard({
  book,
  isBorrowed,
  onBorrow,
  onReturn,
}: BookCardProps) {
  return (
    <article className="book-card">
      <h3>{book.title}</h3>

      <p>Tác giả: {book.author}</p>
      <p>Thể loại: {book.category}</p>
      <p>Năm xuất bản: {book.publishedYear}</p>
      <p>Số lượng còn: {book.copiesLeft}</p>

      {isBorrowed ? (
        <button
          className="return-button"
          onClick={() => onReturn(book.id)}
        >
          Trả sách
        </button>
      ) : (
        <button
          className="borrow-button"
          onClick={() => onBorrow(book.id)}
          disabled={book.copiesLeft <= 0}
        >
          Mượn sách
        </button>
      )}
    </article>
  );
}

export default memo(BookCard);