
import type { ApiResult, Book } from "../features/books/booksTypes";

const books: Book[] = [
  {
    id: "b1",
    title: "Lập trình TypeScript",
    author: "Nguyễn Văn An",
    category: "CNTT",
    publishedYear: 2023,
    copiesLeft: 3,
  },
  {
    id: "b2",
    title: "React cơ bản",
    author: "Trần Minh Anh",
    category: "CNTT",
    publishedYear: 2024,
    copiesLeft: 2,
  },
  {
    id: "b3",
    title: "Cấu trúc dữ liệu và giải thuật",
    author: "Lê Minh Tuấn",
    category: "CNTT",
    publishedYear: 2022,
    copiesLeft: 3,
  },
  {
    id: "b4",
    title: "Kinh tế vi mô",
    author: "Phạm Thu Hà",
    category: "Kinh tế",
    publishedYear: 2022,
    copiesLeft: 4,
  },
  {
    id: "b5",
    title: "Marketing căn bản",
    author: "Nguyễn Thu Trang",
    category: "Kinh tế",
    publishedYear: 2023,
    copiesLeft: 2,
  },
  {
    id: "b6",
    title: "Quản trị học",
    author: "Trần Quốc Bảo",
    category: "Kinh tế",
    publishedYear: 2021,
    copiesLeft: 4,
  },
  {
    id: "b7",
    title: "Tiếng Anh giao tiếp",
    author: "John Smith",
    category: "Ngoại ngữ",
    publishedYear: 2021,
    copiesLeft: 0,
  },
  {
    id: "b8",
    title: "Ngữ pháp tiếng Anh",
    author: "Sarah Lee",
    category: "Ngoại ngữ",
    publishedYear: 2020,
    copiesLeft: 3,
  },
  {
    id: "b9",
    title: "Từ vựng TOEIC",
    author: "David Brown",
    category: "Ngoại ngữ",
    publishedYear: 2024,
    copiesLeft: 2,
  },
];

export function getBooks(
  shouldFail = false,
): Promise<ApiResult<Book[]>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({
          ok: false,
          error: "Không thể tải danh sách sách. Vui lòng thử lại!",
        });
        return;
      }

      resolve({
        ok: true,
        data: books.map((book) => ({ ...book })),
      });
    }, 500);
  });
}
