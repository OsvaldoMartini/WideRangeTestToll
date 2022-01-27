interface ICriteriaButtons {
  id: number;
  title: string;
  filterName?: string;
  width: number;
  action?: string;
  hoverClicked?: boolean;
}

export interface ICardMainData {
  id?: number;
  title?: string;
  subtitle?: string;
  criteriaOptions?: ICriteriaButtons[];
}
