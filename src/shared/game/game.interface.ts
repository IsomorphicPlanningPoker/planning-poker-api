import { Story } from '../story/story.interface';

export interface Game {
  _id?: string;
  name: string;
  // activeStory: string;
  owner?: string;
  stories?: Array<Story>;
}
