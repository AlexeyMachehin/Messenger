export type Props = {
  settings?: {
    withInternalID: boolean;
  };
  events?: {
    [key: string]: EventListener;
  };
  attr?: {
    [key: string]: string | number | boolean;
  };
  class?: string[],
  [key: string]: unknown
};
