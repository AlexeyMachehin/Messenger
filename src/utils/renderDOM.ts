import { CommonProps } from "./models/props";
import Block from "./block";

export function render(query: string, block: Block<CommonProps>) {
  const root = document.querySelector(query);
  const content = block.getContent();
  if (content != null) {
    root?.appendChild(content);
  }
  block.dispatchComponentDidMount();

  return root;
}
