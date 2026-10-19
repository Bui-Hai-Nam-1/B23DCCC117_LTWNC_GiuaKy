import type { Middleware } from "@reduxjs/toolkit";
import {
  borrowLimitReached,
  borrowRequested,
} from "../features/books/booksSlice";

export const booksMiddleware: Middleware =
  (store) => (next) => (action) => {
    if (
      borrowRequested.match(action) &&
      store.getState().books.borrowedIds.length >= 3
    ) {
      store.dispatch(borrowLimitReached());
      return action;
    }

    return next(action);
  };