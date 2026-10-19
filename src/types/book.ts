
export type BookCategory = "CNTT" | "Kinh tế" | "Ngoại ngữ";

export interface Book {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  publishedYear: number;
  copiesLeft: number;
}

export type BookSummary = Pick<
  Book,
  "id" | "title" | "author" | "category"
>;

export type NewBook = Omit<Book, "id">;

export type BookUpdate = Partial<NewBook>;

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export function isApiSuccess<T>(
  result: ApiResult<T>,
): result is { ok: true; data: T } {
  return result.ok === true;
}
