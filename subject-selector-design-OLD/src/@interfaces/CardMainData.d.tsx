export interface ICardMainData {
  id?: number;
  title?: string;
  subtitle?: string;
  badge?: string;
  onClick: React.MouseEventHandler<HTMLLIElement>;
}
