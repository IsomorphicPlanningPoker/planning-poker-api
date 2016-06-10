import { Story } from '../../../story/story.interface';
import { vote } from '../vote/vote.mock';

export const storyWithVote: Story = {
  _id: 'teststoryid',
  name: 'teststoryname',
  votes: [ vote ]
};
