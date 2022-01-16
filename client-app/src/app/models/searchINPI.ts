export interface IMarca{
    number: number;
    agent: string;
    searchColidences: (wordToSearch: string) => void;
    searchProcessNumber:(processNumber: number) => void;
    searchAgent: (nameAgent: string) => void;
}

export interface IPatente{
    number: number;
    agent: string;
    searchColidences: (wordToSearch: string) => void;
    searchNumber: (numberToSearch: number) => void;
}

const marca: IMarca = {
    number: 12345,
    agent: 'Martini Marcas',
    searchColidences: (wordToSearch: string) => console.log(wordToSearch),
    searchProcessNumber: (processNumber: number) => console.log(processNumber),
    searchAgent:(nameAgent: string) => console.log(nameAgent)
}

const patente: IPatente = {
  number: 123456,
  agent: 'Martini Marcas',
  searchColidences: (wordToSearch: string) => console.log(wordToSearch),
  searchNumber:(numbertoSearch: number) => console.log(numbertoSearch)
}


marca.searchAgent('Martini');
patente.searchNumber(12345);

export const searchsMocked =[marca, patente]