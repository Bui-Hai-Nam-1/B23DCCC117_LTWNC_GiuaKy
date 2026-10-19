import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchBooks } from "../features/books/booksSlice";
import BooksList from "../features/books/BooksList";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const dispatch = useAppDispatch();
  const { status, error, borrowedIds } = useAppSelector(
    (state) => state.books,
  );
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (status === "idle") {
      void dispatch(fetchBooks());
    }
  }, [dispatch, status]);

  return (
    <main>
      <header>
        <h1>Mini Library</h1>
        <button onClick={toggleTheme}>
          Chuyển sang giao diện {theme === "light" ? "tối" : "sáng"}
        </button>
      </header>

      <p>Số sách đang mượn: {borrowedIds.length}/3</p>

      {status === "loading" && <p role="status">Đang tải sách...</p>}

      {status === "failed" && (
        <div role="alert">
          <p>{error}</p>
          <button onClick={() => void dispatch(fetchBooks())}>
            Thử lại
          </button>
        </div>
      )}

      {status === "succeeded" && <BooksList />}
    </main>
  );
}