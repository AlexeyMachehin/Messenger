import { Block } from "../Block";

export interface BlockConstructor<CommonProps extends Record<string, any>> {
  new (props: CommonProps): Block<CommonProps>;
}
