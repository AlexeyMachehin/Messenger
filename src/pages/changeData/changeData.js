
const openBtn = document.querySelector("#open");
const closeBtn = document.querySelector(".close-modal-button")

const dialog = document.querySelector("dialog");
openBtn.addEventListener('click', () => dialog.showModal())
closeBtn.addEventListener('click', () => dialog.close())

// document.querySelector('.card').addEventListener('click', (e) => e.stopPropagation());
// document.querySelector('dialog').addEventListener('click', (e) => e.target.close());
