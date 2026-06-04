export function sortBookmarks(bookmarksWithIndex) {
  return [...bookmarksWithIndex].sort((a, b) => {
    return b.bookmark.createdAt - a.bookmark.createdAt;
  });
}
