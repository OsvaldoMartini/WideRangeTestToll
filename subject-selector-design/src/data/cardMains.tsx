import { ICardMain } from "../@interfaces";

const cardMain0: ICardMain = {
  id: 0,
  title: "Demographic",
  subtitle: "Demo",
  badge: "Exclusive deal",
  onClick: () => {`I clicked Demographic`}
};

const cardMain1: ICardMain = {
  id: 1,
  title: "Episode",
  subtitle: "Epi",
  badge: "",
  onClick: () => {`I clicked Episode`}
};

const cardMain2: ICardMain = {
  id: 2,
  title: "Screening",
  subtitle: "Scre",
  badge: "",
  onClick: () => {`I clicked Screening`}
};

const cardMain3: ICardMain = {
  id: 3,
  title: "Diagnostic",
  subtitle: "Diag",
  badge: "",
  onClick: () => {`I clicked Diagnostic`}
};
const cardMain4: ICardMain = {
  id: 4,
  title: "Kit Status",
  subtitle: "Kit",
  badge: "",
  onClick: () => {`I clicked Kit Status`}
};
const cardMain5: ICardMain = {
  id: 5,
  title: "Surveillance",
  subtitle: "Scre",
  badge: "",
  onClick: () => {`I clicked Surveillance`}
};

export const cardMains: ICardMain[] = [cardMain0, cardMain1, cardMain2, cardMain3, cardMain4, cardMain5];
