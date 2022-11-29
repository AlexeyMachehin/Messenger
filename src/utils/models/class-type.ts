import Block from "../block";

export interface BlockConstructor<CommonProps extends Record<string, any>> {
  new (props: CommonProps): Block<CommonProps>;
}
