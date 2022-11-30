type Callback = (...value: any) => void;

export class EventBus {
  listeners: {
    [key: string]: Callback[];
  };

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Callback): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: Callback): void {
    if (!this.listeners[event]) {
      console.log(`Нет события: ${event}`);
      return;
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: string, ...args: any[]): void {
    if (!this.listeners[event]) {
      console.log(`Нет события: ${event}`);
      return;
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
