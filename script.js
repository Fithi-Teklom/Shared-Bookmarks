// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData } from "./storage.js";

const userSelect = document.getElementById("user-select");
const bookmarkList = document.getElementById("bookmark-list");

window.onload = function () {
  const allUsers = ["1", "2", "3", "4", "5"];

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

  const users = getUserIds();
  users.forEach((userId) => {
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
