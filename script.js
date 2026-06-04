import { sortBookmarks } from "./sortBookmarks.js";
import { getUserIds, getData, setData } from "./storage.js";

const userSelect = document.getElementById("user-select");
const bookmarkList = document.getElementById("bookmark-list");

const bookmarkForm = document.getElementById("bookmark-form");
const titleInput = document.getElementById("title");
const urlInput = document.getElementById("url");
const descriptionInput = document.getElementById("description");

function renderBookmarks(userId) {
  const bookmarks = getData(userId) || [];
  let dataChanged = false;

  bookmarks.forEach((bookmark) => {
    if (typeof bookmark.likes !== "number") {
      bookmark.likes = 0;
      dataChanged = true;
    }

    const bookmarkDate = new Date(bookmark.createdAt);

    if (!bookmark.createdAt || isNaN(bookmarkDate.getTime())) {
      bookmark.createdAt = Date.now();
      dataChanged = true;
    }
  });

  if (dataChanged) {
    setData(userId, bookmarks);
  }

  if (bookmarks.length === 0) {
    bookmarkList.innerHTML = "<li>No bookmarks found for this user.</li>";
    return;
  }

  const bookmarksWithIndex = bookmarks.map((bookmark, index) => {
    return {
      bookmark: bookmark,
      index: index,
    };
  });

  const sortedBookmarks = sortBookmarks(bookmarksWithIndex);

  bookmarkList.innerHTML = "";

  sortedBookmarks.forEach((item) => {
    const bookmark = item.bookmark;
    const originalIndex = item.index;

    const listItem = document.createElement("li");
    listItem.className = "bookmark-card";

    const title = document.createElement("h3");

    const link = document.createElement("a");
    link.href = bookmark.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = bookmark.title;

    title.appendChild(link);

    const description = document.createElement("p");
    description.textContent = bookmark.description;

    const date = document.createElement("small");
    date.textContent = `Added on: ${new Date(bookmark.createdAt).toLocaleString()}`;

    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.textContent = "Copy to clipboard";

    copyButton.addEventListener("click", () => {
      navigator.clipboard.writeText(bookmark.url);
    });

    const likeButton = document.createElement("button");
    likeButton.type = "button";
    likeButton.textContent = `❤️ Likes: ${bookmark.likes}`;

    likeButton.addEventListener("click", () => {
      bookmarks[originalIndex].likes = bookmarks[originalIndex].likes + 1;
      setData(userId, bookmarks);
      renderBookmarks(userId);
    });

    listItem.appendChild(title);
    listItem.appendChild(description);
    listItem.appendChild(date);
    listItem.appendChild(document.createElement("br"));
    listItem.appendChild(copyButton);
    listItem.appendChild(likeButton);

    bookmarkList.appendChild(listItem);
  });
}

window.onload = function () {
  const allUsers = getUserIds();

  allUsers.forEach((userId) => {
    const option = document.createElement("option");

    option.value = userId;
    option.innerText = `User ${userId}`;

    userSelect.appendChild(option);
  });

  userSelect.addEventListener("change", (event) => {
    const selectedUserId = event.target.value;

    if (!selectedUserId) {
      bookmarkList.innerHTML = "";
      return;
    }

    renderBookmarks(selectedUserId);
  });

  bookmarkForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectedUserId = userSelect.value;

    if (!selectedUserId) {
      alert("Please select a user first");
      return;
    }

    const bookmarks = getData(selectedUserId) || [];

    bookmarks.push({
      title: titleInput.value,
      url: urlInput.value,
      description: descriptionInput.value,
      createdAt: Date.now(),
      likes: 0,
    });

    setData(selectedUserId, bookmarks);

    renderBookmarks(selectedUserId);

    bookmarkForm.reset();
  });
};
