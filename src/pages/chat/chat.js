import { Dialog } from "../../components/dialogModal/dialogService";

const addUserModal = new Dialog(".addUserModal");
const deleteUserDialog = new Dialog(".deleteUserModal");
const deleteChatModal = new Dialog(".deleteChatModal");

const addUserButton = document.querySelector("#addUser");
const deleteUserButton = document.querySelector("#DeleteUser");
const deleteChatButton = document.querySelector("#DeleteChat");

addUserButton.addEventListener("click", () => addUserModal.openDialog());
deleteUserButton.addEventListener("click", () => deleteUserDialog.openDialog());
deleteChatButton.addEventListener("click", () => deleteChatModal.openDialog());

const selectListHeader = document.querySelector(".chat__header-container");
const selectListFooter = document.querySelector(".chat__footer-container");
const addDeleteUserButton = document.querySelector(".manage-user__button");
const addFileButton = document.querySelector(".manage-file__button");
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
