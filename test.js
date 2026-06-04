import assert from "node:assert";
import test from "node:test";

import { sortBookmarks } from "./sortBookmarks.js";

test("Bookmarks are sorted in reverse chronological order", () => {
  const bookmarks = [
    {
      bookmark: { createdAt: 100 },
      index: 0,
    },
    {
      bookmark: { createdAt: 300 },
      index: 1,
    },
    {
      bookmark: { createdAt: 200 },
      index: 2,
    },
  ];

  const result = sortBookmarks(bookmarks);

  assert.equal(result[0].bookmark.createdAt, 300);
  assert.equal(result[1].bookmark.createdAt, 200);
  assert.equal(result[2].bookmark.createdAt, 100);
});