
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { borrowRequested, returnBook, clearWarning } from "./booksSlice";
import { useFilterStore } from "../filters/filterStore";
import { useDebounce } from "../../hooks/useDebounce";
import BookCard from "./BookCard";
import type { BookCategory } from "./booksTypes";

export default function BooksList() {
  const dispatch = useAppDispatch();

  const books = useAppSelector((state) => state.books.books);
  const borrowedIds = useAppSelector((state) => state.books.borrowedIds);
  const status = useAppSelector((state) => state.books.status);
  const error = useAppSelector((state) => state.books.error);
  const warning = useAppSelector((state) => state.books.warning);

  const warningRef = useRef<HTMLDivElement>(null);

  const search = useFilterStore((state) => state.search);
  const category = useFilterStore((state) => state.category);
  const setSearch = useFilterStore((state) => state.setSearch);
  const setCategory = useFilterStore((state) => state.setCategory);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    if (warning) {
      warningRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [warning]);

  const filteredBooks = useMemo(() => {
    const query = debouncedSearch.trim().toLocaleLowerCase();

    return books.filter((book) => {
      const matchesSearch =
        book.title.toLocaleLowerCase().includes(query) ||
        book.author.toLocaleLowerCase().includes(query);

      const matchesCategory =
        category === "Tất cả" || book.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [books, debouncedSearch, category]);

  const handleBorrow = useCallback(
    (bookId: string) => {
      dispatch(borrowRequested(bookId));
    },
    [dispatch],
  );

  const handleReturn = useCallback(
    (bookId: string) => {
      dispatch(returnBook(bookId));
    },
    [dispatch],
  );

  if (status === "loading") {
    return <p role="status">Đang tải...</p>;
  }

  if (status === "failed") {
    return (
      <section>
        <p className="error-message" role="alert">
          {error ?? "Không thể tải danh sách sách."}
        </p>
      </section>
    );
  }

  return (
    <section>
      <div className="toolbar">
        <input
          type="search"
          aria-label="Tìm sách"
          placeholder="Tìm theo tên sách hoặc tác giả..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
            aria-label="Lọc theo thể loại"
            value={category}
            onChange={(event) => {
                setCategory(event.target.value as BookCategory | "Tất cả");
            }}
            >
            <option value="Tất cả">Tất cả thể loại</option>
            <option value="CNTT">CNTT</option>
            <option value="Kinh tế">Kinh tế</option>
            <option value="Ngoại ngữ">Ngoại ngữ</option>
        </select>
      </div>

      <p>
        Đang mượn: <strong>{borrowedIds.length}/3</strong> cuốn
      </p>

      {warning && (
        <div
          ref={warningRef}
          className="warning-message"
          role="alert"
          aria-live="assertive"
        >
          <strong>Không thể thực hiện thao tác!</strong>
          <p>{warning}</p>
          <button type="button" onClick={() => dispatch(clearWarning())}>
            Đóng thông báo
          </button>
        </div>
      )}

      {filteredBooks.length === 0 ? (
        <p>Không tìm thấy sách phù hợp.</p>
      ) : (
        <div className="book-list">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isBorrowed={borrowedIds.includes(book.id)}
              onBorrow={handleBorrow}
              onReturn={handleReturn}
            />
          ))}
        </div>
      )}
    </section>
  );
}
