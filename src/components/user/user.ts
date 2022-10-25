import { Block } from "../../utils/block";

class User extends Block {
  constructor(props) {
    super("div", props);
  }
  render() {
    // В проекте должен быть ваш собственный шаблонизатор
    return `<div>${this.props.text}</div>`;
  }
}

function render(query, block) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  return root;
}

const user = new User({
  name,
  message,
  time,
  count,
  avatarURL,
});

// app — это class дива в корне DOM
render(".app", button);

// Через секунду контент изменится сам, достаточно обновить пропсы
setTimeout(() => {
  button.setProps({
    text: "Click me, please",
  });
}, 1000);
