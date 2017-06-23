import { Item } from './item';
import  moment  from 'moment';

export const ITEMS: Item[] = [
  {
    id: 0,
    name: 'Meditate',
    days: {
          Monday: true,
          Tuesday: true,
          Wednesday: false,
          Thursday: true,
          Friday: false,
          Saturday: false,
          Sunday: false,
    },
    time: '5:00',
    meridian: 'AM',
    notes: 'No thoughts.',
    type: 'Health',
    completed: false
  },
  {
    id: 1,
    name: 'Gym: Arms Day',
    days: {
      Monday: true,
      Tuesday: true,
      Wednesday: false,
      Thursday: true,
      Friday: false,
      Saturday: false,
      Sunday: true,
    },
    time: '7:30',
    meridian: 'AM',
    notes: 'Hit the peak.',
    type: 'Health',
    completed: false
  },
  {
    id: 2,
    name: 'Work at COSM',
    days: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: false,
      Sunday: false,
    },
    time: '9:30',
    meridian: 'AM',
    notes: 'AllChoice & BIM',
    type: 'Business',
    completed: false
  },
  {
    id: 0,
    name: 'Finish the App.',
    days: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    },
    time: '6:00',
    meridian: 'PM',
    notes: 'Get crackin boi',
    type: 'Personal',
    completed: false
  }
];
