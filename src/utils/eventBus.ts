type Callback = (value?: any)=>{};

export class EventBus {
  listeners: {
    [key: string]: Callback[]
  }

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Callback): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
    console.log(this.listeners);
  }

  off(event: string, callback: Callback): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: string, ...args: any[]): void {
    if (!this.listeners[event]) {
      throw new Event(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}

// const eventBus = new EventBus();

// const callback = () => {
//   console.log("Event emitted");
// };

// eventBus.on("Alex", (props) => {
//   console.log(`I am Alex ${props.surname}`);
// });
// eventBus.on("Alex", (props) => {
//   console.log(props.age);
// });
// const props = {
//   surname: "Smit",
//   age: 5,
// };
// eventBus.emit("Alex", props);
// // eventBus.on('fdrg', callback);
// // eventBus.on('reter', callback);

// // Так как мы передаём новую функцию (а значит, новую ссылку), оригинальный обработчик не будет отписан
// // eventBus.off('myEvent', () => { console.log('Event emitted'); });

// // Теперь передаём правильную ссылку, обработчик будет отписан
// // eventBus.off('myEvent', callback);
