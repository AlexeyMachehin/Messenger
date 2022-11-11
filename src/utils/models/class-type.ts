import Block from '../block';

export interface BlockConstructor<Props extends Record<string, any>> {
    new(props: Props): Block<Props>;
}
