const selectListHeader = document.querySelector(".select-list-header");
const selectListFooter = document.querySelector(".select-list-footer");

// const addFileList = document.querySelector(".add-file-list");

const addDeleteUserButton = document.querySelector(".add-delete-user-button");
const addFileButton =  document.querySelector(".messages-list__footer__add-file");

const body = document.querySelector("body");

addDeleteUserButton.addEventListener("click", (e) => {
  selectListFooter.classList.remove("select-list-active");
  addDeleteUserButton.classList.toggle("add-delete-user-button-active");
  selectListHeader.classList.toggle("select-list-active");
  e.stopPropagation();
});

addFileButton.addEventListener("click", (e) => {
  selectListHeader.classList.remove("select-list-active");
  addFileButton.classList.toggle("add-delete-user-button-active");
  addFileButton.classList.toggle("messages-list__footer__add-file-active");
  selectListFooter.classList.toggle("select-list-active");
  e.stopPropagation();
});

body.addEventListener("click", () => {
  addDeleteUserButton.classList.remove("add-delete-user-button-active");
  addFileButton.classList.remove("messages-list__footer__add-file-active");
  selectListHeader.classList.remove("select-list-active");
  selectListFooter.classList.remove("select-list-active");
});


// addFileButton.addEventListener("click", (e) => {
//   // addFileButton.classList.toggle("add-delete-user-button-active");
//   addFileList.toggle("add-delete-user-list-active");
//   e.stopPropagation();
// });


// body.addEventListener("click", () => {
//   // addFileButton.classList.remove("add-delete-user-button-active");
//   addFileList.remove("add-delete-user-list-active");
// });