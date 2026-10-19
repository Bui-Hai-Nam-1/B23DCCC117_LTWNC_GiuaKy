
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import type { BookCategory } from "../features/books/booksTypes";

const categories: BookCategory[] = ["CNTT", "Kinh tế", "Ngoại ngữ"];

export default function Stats() {
  const books = useAppSelector((state) => state.books.books);
  const borrowedIds = useAppSelector((state) => state.books.borrowedIds);
  const status = useAppSelector((state) => state.books.status);

  if (status === "loading" || status === "idle") {
    return (
      <main className="page-container">
        <p role="status">Đang tải dữ liệu thống kê...</p>
      </main>
    );
  }

  if (status === "failed") {
    return (
      <main className="page-container">
        <p className="error-message">
          Chưa thể thống kê vì tải dữ liệu sách thất bại.
        </p>
        <Link to="/">Quay lại trang chủ để thử tải lại</Link>
      </main>
    );
  }

  const borrowedBooks = borrowedIds
    .map((id) => books.find((book) => book.id === id))
    .filter(
        (book): book is NonNullable<typeof book> => book !== undefined,
    );

  return (
    <main className="page-container">
      <h1>Thống kê thư viện</h1>

      <div className="book-list">
        <section className="book-card">
          <h3>Tổng số đầu sách</h3>
          <p>{books.length}</p>
        </section>

        <section className="book-card">
          <h3>Số sách đang được mượn</h3>
          <p>{borrowedBooks.length}</p>
        </section>
      </div>

      <h2>Đầu sách theo thể loại</h2>

      <div className="book-list">
        {categories.map((category) => {
          const count = books.filter(
            (book) => book.category === category,
          ).length;

          return (
            <section className="book-card" key={category}>
              <h3>{category}</h3>
              <p>Số đầu sách: <strong>{count}</strong></p>
            </section>
          );
        })}
      </div>

      <h2>Danh sách sách đang mượn</h2>

      {borrowedBooks.length === 0 ? (
        <p>Hiện chưa có sách nào được mượn.</p>
      ) : (
        <ul>
          {borrowedBooks.map((book) => (
            <li key={book.id}>
              {book.title} — {book.author}
            </li>
          ))}
        </ul>
      )}

      <Link to="/" className="back-link">
        ← Quay lại thư viện
      </Link>
    </main>
  );
}
