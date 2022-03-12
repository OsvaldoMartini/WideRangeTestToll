import { ICardMainData } from "../components";

const cardMain0: ICardMainData = {
  id: 1,
  title: "Demographic",
  subtitle: "Demo",
  // filtersSelection: [
  //   {
  //     id: 1,
  //     title: "Specific Age",
  //     subTitle: "15",
  //     operation: "equal",
  //     minAgeValue: 15,
  //     maxAgeValue: -9999
  //   },
  //   {
  //     id: 2,
  //     title: "Between Ages",
  //     subTitle: "15 - 25",
  //     operation: "between",
  //     minAgeValue: 15,
  //     maxAgeValue: 25
  //   },
  //   {
  //     id: 3,
  //     title: "NHS number",
  //     subTitle: "333 444 555",
  //     operation: "equal",
  //   },
  // ],
  criteriaOptions: [
    {
      id: 1,
      title: "NHS Number",
      width: 110,
      action: "Default",
      filterName: "NHS Number",
      hoverClicked: false
    },
    {
      id: 2,
      title: "Age",
      width: 44,
      action: "AgeCriteriaVar",
      filterName: "Subject Age",
      hoverClicked: false
    },
    {
      id: 3,
      title: "Hub",
      width: 44,
      action: "Default",
      filterName: "Hub Name",
      hoverClicked: false
    },
    {
      id: 4,
      title: "Screening Centre",
      width: 140,
      action: "Default",
      filterName: "Centre Name",
      hoverClicked: false
    },
    {
      id: 5,
      title: "GP Practice",
      width: 125,
      action: "Default",
      filterName: "Nome GP",
      hoverClicked: false
    },
  ],
};

const cardMain1: ICardMainData = {
  id: 2,
  title: "Episode",
  subtitle: "Epi",
  criteriaOptions: [
    {
      id: 1,
      title: "Number",
      width: 50,
    },
    {
      id: 2,
      title: "Age",
      width: 44,
      action: "AgeCriteriaVar",
      filterName: "Subject Age",
      hoverClicked: false
    },
    {
      id: 3,
      title: "Date of Birthday",
      width: 250,
    },
    {
      id: 4,
      title: "Epi Screening Centre",
      width: 125,
    },
    {
      id: 5,
      title: "Epi GP Practice",
      width: 125,
    },
  ],
};

const cardMain2: ICardMainData = {
  id: 3,
  title: "Screening",
  subtitle: "Scre",
  criteriaOptions: [
    {
      id: 1,
      title: "NHS Number",
      width: 100,
    },
    {
      id: 2,
      title: "Age",
      width: 44,
    },
    {
      id: 3,
      title: "Hub",
      width: 44,
    },
    {
      id: 4,
      title: "Screening Centre",
      width: 125,
    },
    {
      id: 5,
      title: "GP Practice",
      width: 125,
    },
  ],
};

const cardMain3: ICardMainData = {
  id: 4,
  title: "Diagnostic",
  subtitle: "Diag",
  criteriaOptions: [
    {
      id: 1,
      title: "NHS Number",
      width: 100,
    },
    {
      id: 2,
      title: "Age",
      width: 44,
    },
    {
      id: 3,
      title: "Hub",
      width: 44,
    },
    {
      id: 4,
      title: "Screening Centre",
      width: 125,
    },
    {
      id: 5,
      title: "GP Practice",
      width: 125,
    },
  ],
};
const cardMain4: ICardMainData = {
  id: 5,
  title: "Kit Status",
  subtitle: "Kit",
  criteriaOptions: [
    {
      id: 1,
      title: "NHS Number",
      width: 100,
    },
    {
      id: 2,
      title: "Age",
      width: 44,
    },
    {
      id: 3,
      title: "Hub",
      width: 44,
    },
    {
      id: 4,
      title: "Screening Centre",
      width: 125,
    },
    {
      id: 5,
      title: "GP Practice",
      width: 125,
    },
  ],
};

const cardMain5: ICardMainData = {
  id: 6,
  title: "Surveillance",
  subtitle: "Scre",
  // filtersSelection: [
  //   {
  //     id: 1,
  //     title: "Between Ages",
  //     subTitle: "15 - 25",
  //     operation: "between",
  //     minAgeValue: 15,
  //     maxAgeValue: 25
  //   },
  //   {
  //     id: 2,
  //     title: "NHS number",
  //     subTitle: "456 333 111",
  //     operation: "equal",
  //   },
  //   {
  //     id: 3,
  //     title: "Specific Age",
  //     subTitle: "35",
  //     operation: "equal",
  //     minAgeValue: 15,
  //     maxAgeValue: -9999
  //   },
  // ],
  criteriaOptions: [
    {
      id: 1,
      title: "NHS Number",
      width: 100,
    },
    {
      id: 2,
      title: "Age",
      width: 44,
    },
    {
      id: 3,
      title: "Hub",
      width: 44,
    },
    {
      id: 4,
      title: "Screening Centre",
      width: 125,
    },
    {
      id: 5,
      title: "Age from Grand Mother",
      width: 44,
      action: "AgeCriteriaVar",
      filterName: "Subject Age",
      hoverClicked: false
    },
  ],
};


export const cardsData: ICardMainData[] = [
  cardMain0,
  cardMain1,
  cardMain2,
  cardMain3,
  cardMain4,
  cardMain5,
];
