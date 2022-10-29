import Block from "./block";

export function render(query: string, block: Block) {
  const root = document.querySelector(query);

  root?.appendChild(block.getContent());
  console.log(block.getContent());
  block.dispatchComponentDidMount();

  return root;
}
