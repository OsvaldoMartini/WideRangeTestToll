export interface ICardMain {
  id?: number;
  title?: string;
  subtitle?: string;
  badge?: string;
   onClick: React.MouseEventHandler<HTMLLIElement>;  
}
