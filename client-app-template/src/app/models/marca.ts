import { IAttendee } from "../models/attendee";

export interface IMarcasEnvelope {
    marcas: IMarca[];
    marcaCount: number;
  }
  
  export interface IMarca {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    expire: Date;
    processoNumber: string;
    procurador: string;
    proprietario: string;
    isGoing: boolean;
    isHost: boolean;
    attendees: IAttendee[];
    comments: IComment[];
  }
  
  export interface IComment {
    id: string;
    createdAt: Date;
    body: string;
    username: string;
    displayName: string;
    image: string;
  }
  
  export interface IMarcaFormValues extends Partial<IMarca> {
    time?: Date;
  }
  
  export class MarcaFormValues implements IMarcaFormValues {
    id?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date?: Date = undefined;
    expire?: Date = undefined;
    time?: Date = undefined;
    processoNumber: string = '';
    procurador: string = '';
    proprietario: string = '';
  
    constructor(init?: IMarcaFormValues) {
      if (init && init.date) {
        init.time = init.date;
      }
      Object.assign(this, init);
    }
  }
 
  