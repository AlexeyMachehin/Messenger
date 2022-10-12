import { Dialog } from '../../components/dialogModal/dialogService';

const dialog = new Dialog('.uploadAvatarModal');
const openBtn = document.querySelector("#open");

openBtn.addEventListener("click", () => dialog.openDialog());
