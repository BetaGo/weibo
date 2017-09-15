import { schema } from 'normalizr';

export const user = new schema.Entity('users');

export const retweet = new schema.Entity('retweets', {
  creator: user
});

export const tweet = new schema.Entity('tweets', {
  user,
  retweet
});
