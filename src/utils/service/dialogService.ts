export class Dialog {
    private _dialog: HTMLDialogElement | null;
    private _closeButton: Element | null;
    constructor(className: string) {
      this._dialog = document.querySelector(className);
      this._closeButton = document.querySelector(
        `${className} .close-modal-button`
      );
      this._subscribeToClickOnCLose();
    }
  
    openDialog() {
      this._dialog?.showModal();
    }
  
    closeDialog() {
      this._dialog?.close();
    }
  
    private _subscribeToClickOnCLose() {
      this._closeButton?.addEventListener("click", () => this.closeDialog());
    }
  }
  