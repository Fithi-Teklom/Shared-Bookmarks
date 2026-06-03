
import { getUserIds, getData, setData } from "./storage.js";

const userSelect = document.getElementById("user-select");
const bookmarkList = document.getElementById("bookmark-list");

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

    const bookmarks = getData(selectedUserId) || [];

    if (bookmarks.length === 0) {
      bookmarkList.innerHTML = "<li>No bookmarks found for this user.</li>";
    } else {
      bookmarks.sort((a, b) => b.createdAt - a.createdAt);
      bookmarkList.innerHTML = bookmarks
        .map(
          (bookmark) => `
           <li class="bookmark-card">
              <h3><a href="${bookmark.url}" target="_blank">${bookmark.title}</a></h3>
              <p>${bookmark.description}</p>
              <small>Added on: ${new Date(bookmark.createdAt).toLocaleString()}</small>
              <br>
              <button disabled>❤️ Likes: ${bookmark.likes}</button>
            </li>
          `,
        )
        .join("");
    }
  });
};
