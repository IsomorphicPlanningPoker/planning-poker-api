import { Player } from './../player/player.interface';
import { Story } from './../story/story.interface';

export interface Vote {
  _id?: string;
  player: string;
  vote: number;
}
