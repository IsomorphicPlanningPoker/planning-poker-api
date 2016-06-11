import { Vote } from './../vote/vote.interface';

export interface Story {
  _id?: string;
  name: string;
  // flipped: boolean;
  votes?: Array<Vote>;
}
