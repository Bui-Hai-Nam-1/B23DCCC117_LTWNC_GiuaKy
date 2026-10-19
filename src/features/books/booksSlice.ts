import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getBooks } from "../../api/booksApi";
import { isApiSuccess } from "./booksTypes";
import type { Book } from "./booksTypes";

type BooksStatus = "idle" | "loading" | "succeeded" | "failed";

interface BooksState {
  books: Book[];
  borrowedIds: string[];
  status: BooksStatus;
  error: string | null;
  warning: string | null;
}

const initialState: BooksState = {
  books: [],
  borrowedIds: [],
  status: "idle",
  error: null,
  warning: null,
};

export const fetchBooks = createAsyncThunk<
  Book[],
  { shouldFail?: boolean } | undefined,
  { rejectValue: string }
>("books/fetchBooks", async (arg, { rejectWithValue }) => {
  const result = await getBooks(arg?.shouldFail ?? false);

  if (isApiSuccess(result)) {
    return result.data;
  }

  return rejectWithValue(result.error);
});

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    borrowRequested(state, action: PayloadAction<string>) {
      const book = state.books.find(
        (item) => item.id === action.payload,
      );

      if (!book || book.copiesLeft <= 0) return;

      if (state.borrowedIds.includes(action.payload)) {
        state.warning = "Bạn đã mượn sách này rồi!";
        return;
      }

      if (state.borrowedIds.length >= 3) {
        state.warning = "Bạn chỉ được mượn tối đa 3 cuốn sách!";
        return;
      }

      book.copiesLeft -= 1;
      state.borrowedIds.push(action.payload);
      state.warning = null;
    },

    returnBook(state, action: PayloadAction<string>) {
      const book = state.books.find(
        (item) => item.id === action.payload,
      );

      if (!book || !state.borrowedIds.includes(action.payload)) return;

      book.copiesLeft += 1;
      state.borrowedIds = state.borrowedIds.filter(
        (id) => id !== action.payload,
      );
      state.warning = null;
    },

    borrowLimitReached(state) {
      state.warning = "Bạn chỉ được mượn tối đa 3 cuốn sách!";
    },

    clearWarning(state) {
      state.warning = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
        state.error = null;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ?? "Đã xảy ra lỗi khi tải danh sách sách.";
      });
  },
});

export const {
  borrowRequested,
  returnBook,
  borrowLimitReached,
  clearWarning,
} = booksSlice.actions;

export default booksSlice.reducer;