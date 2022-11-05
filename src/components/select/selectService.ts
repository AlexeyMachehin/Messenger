export default class SelectService {
  private _select: HTMLDialogElement | null;
  private _body: Element | null;
  constructor(className: string) {
    this._select = document.querySelector(className);
    this._body = document.querySelector('body');
    this._subscribeToClickOnCLose();
  }

  open() {
    this._select?.classList.toggle('active');
  }

  close() {
    this._select?.classList.remove('active');
  }

  private _subscribeToClickOnCLose() {
    this._body?.addEventListener("click", () => this.close());
  }
}
