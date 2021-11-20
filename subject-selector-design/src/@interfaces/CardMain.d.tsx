export interface ICardMain {
  id?: number;
  title?: string;
  subtitle?: string;
  badge?: string;
  addClassNames?: string;
  addLeftPos?: string;
  left?: number;
  onClick: React.MouseEventHandler<HTMLLIElement>;
}
