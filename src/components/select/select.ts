import Block from "../../utils/block";
import { Props } from "../../utils/models/props";
import SelectItem from "../selectItem/selectItem";
import SelectService from "./selectService";
import { selectTemplate } from "./selectTemplate";

export default class Select extends Block {
  service: SelectService;
  constructor(props: Props & { items: SelectItem[] }) {
    super("ul", {
      ...props,
      class: [...props.class ?? [], "select-list"],
    });
  }

  componentDidMount(): void {
    const classes = this.props.class?.map(cl => '.' + cl);
    this.service = new SelectService(classes?.join('') ?? '')
  }

  render(): DocumentFragment {
    return this.compile(selectTemplate, this.props);
  }
}
