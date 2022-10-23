export class Dialog {
  dialog;
  closeButton;
  constructor(className) {
    this.dialog = document.querySelector(className);
    this.closeButton = document.querySelector(
      `${className} .close-modal-button`
    );
    this.subscribeToClickOnCLose();
  }

  openDialog() {
    this.dialog.showModal();
  }

  closeDialog() {
    this.dialog.close();
  }

  subscribeToClickOnCLose() {
    this.closeButton.addEventListener("click", () => this.closeDialog());
  }
}
