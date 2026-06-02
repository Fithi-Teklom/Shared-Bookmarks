// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData } from "./storage.js";

window.onload = function () {
  const userSelect = document.getElementById("user-select");
  const bookmarkList = document.getElementById("bookmark-list");
  setData("1", [
    {
      title: "MDN Web Docs",
      url: "https://developer.mozilla.org",
      description: "Best place to learn HTML/JS.",
    },
    {
      title: "CodeYourFuture",
      url: "https://codeyourfuture.io",
      description: "Our bootcamp website.",
    },
  ]);
  setData("2", [
    {
      title: "GitHub",
      url: "https://github.com",
      description: "Where we save our code.",
    },
  ]);
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
      bookmarkList.innerHTML = bookmarks
        .map(
          (bookmark) =>
            `<li><a href="${bookmark.url}" target="_blank">${bookmark.title}</a> - ${bookmark.description}</li>`,
        )
        .join("");
    }
  });
};
