import { getUserIds, getData, setData } from "./storage.js";

const userSelect = document.getElementById("user-select");
const bookmarkList = document.getElementById("bookmark-list");

const bookmarkForm = document.getElementById("bookmark-form");
const titleInput = document.getElementById("title");
const urlInput = document.getElementById("url");
const descriptionInput = document.getElementById("description");

function renderBookmarks(userId) {
  const bookmarks = getData(userId) || [];

  if (bookmarks.length === 0) {
    bookmarkList.innerHTML = "<li>No bookmarks found for this user.</li>";
    return;
  }

  bookmarks.sort((a, b) => b.createdAt - a.createdAt);

  bookmarkList.innerHTML = bookmarks
    .map(
      (bookmark) => `
        <li class="bookmark-card">
          <h3>
            <a href="${bookmark.url}" target="_blank">
              ${bookmark.title}
            </a>
          </h3>

          <p>${bookmark.description}</p>

          <small>
            Added on: ${new Date(bookmark.createdAt).toLocaleString()}
          </small>

          <br>

          <button disabled>
            ❤️ Likes: ${bookmark.likes}
          </button>
        </li>
      `
    )
    .join("");
}

window.onload = function () {
  const allUsers = getUserIds();

  allUsers.forEach((userId) => {
    const existingData = getData(userId);

    if (!existingData || existingData.length === 0) {
      setData(userId, [
        {
          title: `Project Ready Bookmark ${userId}`,
          url: "https://codeyourfuture.io",
          description:
            "This bookmark has the correct data structure for the final project.",
          createdAt: Date.now() - userId * 1000,
          likes: 0,
        },
      ]);
    }
  });

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
