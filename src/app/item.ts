

export class Item {
  id: number;
  name: string;
  days: {
    Monday: boolean;
    Tuesday: boolean;
    Wednesday: boolean;
    Thursday: boolean;
    Friday: boolean;
    Saturday: boolean;
    Sunday: boolean;
  };
  time: string;
  meridian: string;
  notes: string;
  type: string;
  completed: boolean;
}
