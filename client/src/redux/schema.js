import { schema } from 'normalizr';

export const user = new schema.Entity('users');

export const retweet = new schema.Entity('retweet', {
  user
});

export const tweet = new schema.Entity('tweets', {
  user,
  retweeted_status: retweet
});

export const timeline = new schema.Entity(
  'timelines',
  { statuses: [tweet] },
  { idAttribute: 'next_cursor' }
);
