import { createSelector } from 'reselect';

import { StoreState } from '../../types';

const tweetsSelector = (state: StoreState) => state.entities.tweets;
const retweetSelector = (state: StoreState) => state.entities.retweet;
const usersSelector = (state: StoreState) => state.entities.users;
const timelineSelector = (state: StoreState) => state.entities.statuses;

export const tweetCardInfoSelector = createSelector(
  tweetsSelector,
  retweetSelector,
  usersSelector,
  timelineSelector,
  (
    tweets: {},
    retweets: {},
    users: {},
    timeline: Array<number>
  ) => {
    const sortedTimeline = timeline.sort((a, b) => b - a);
    return sortedTimeline.map(value => {
      let tweet = tweets[value];
      let user = users[tweet.user];
      // let retweet = tweet.retweet ? retweets[tweet.retweet] : null;
      const {
        text,
        reposts_count,
        comments_count,
        attitudes_count,
        id
      } = tweet;
      const { name, screen_name, profile_image_url } = user;
      return {
        id,
        text,
        name,
        screen_name,
        profile_image_url,
        reposts_count,
        comments_count,
        attitudes_count
      };
    });
  }
);
