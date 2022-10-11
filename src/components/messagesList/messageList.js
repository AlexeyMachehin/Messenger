const addDeleteUserList = document.querySelector(".add-delete-user-list");

const addDeleteUserButton = document.querySelector(".add-delete-user-button");

const body = document.querySelector("body");

addDeleteUserButton.addEventListener("click", (e) => {
  addDeleteUserButton.classList.toggle("add-delete-user-button-active");
  addDeleteUserList.classList.toggle("add-delete-user-list-active");
  e.stopPropagation();
});

body.addEventListener("click", () => {
  addDeleteUserButton.classList.remove("add-delete-user-button-active");
  addDeleteUserList.classList.remove("add-delete-user-list-active");
});
