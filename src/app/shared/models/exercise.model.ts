import { User } from './user.model';

export interface Exercise {
  id: string;
  name: string;
  setNumber: number;
  reps: number;
  weight: number;
  userID: string;
  date: Date;
  userComment?: string;
}
