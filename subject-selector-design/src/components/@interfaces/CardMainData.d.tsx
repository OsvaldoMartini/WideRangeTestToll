interface ICriteriaButtons {
  id: number;
  title: string;
  filterName?: string;
  width: number;
  action?: string;
  hoverClicked?: boolean;
}

export interface IFiltersSelection {
  id?: number;
  title: string;
  short?: string;
  subTitle: string;
  category: string;
  operation: string;
  minAgeValue?: number;
  maxAgeValue?: number;
  nhsNumber?: string;
}

export interface ICardMainData {
  id?: number;
  title?: string;
  subtitle?: string;
  criteriaOptions?: ICriteriaButtons[];
  filtersSelection?: IFiltersSelection[];
}
