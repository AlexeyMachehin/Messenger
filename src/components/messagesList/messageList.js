const selectListHeader = document.querySelector(
  ".select-list-header-container"
);
const selectListFooter = document.querySelector(
  ".select-list-footer-container"
);
const addDeleteUserButton = document.querySelector(".add-delete-user-button");
const addFileButton = document.querySelector(
  ".messages-list__footer__add-file"
);
const body = document.querySelector("body");

addDeleteUserButton.addEventListener("click", (e) => {
  selectListFooter.classList.remove("active");
  selectListHeader.classList.toggle("active");
  e.stopPropagation();
});

addFileButton.addEventListener("click", (e) => {
  selectListHeader.classList.remove("active");
  selectListFooter.classList.toggle("active");
  e.stopPropagation();
});

body.addEventListener("click", () => {
  selectListHeader.classList.remove("active");
  selectListFooter.classList.remove("active");
});
