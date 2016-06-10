import { Player } from './../player/player.interface';
import { Story } from './../story/story.interface';

export interface Vote {
  _id?: string;
  player: Player;
  vote: number;
  story: Story;
}
