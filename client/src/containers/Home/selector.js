// @flow
import { createSelector } from 'reselect';

const tweetsSelector = (state: Object) => state.entities.tweets;
const retweetSelector = (state: Object) => state.entities.retweet;
const usersSelector = (state: Object) => state.entities.users;
const timelineSelector = (state: Object) => state.entities.statuses;

export const tweetCardInfoSelector = createSelector(
  tweetsSelector,
  retweetSelector,
  usersSelector,
  timelineSelector,
  (
    tweets: Object,
    retweets: Object,
    users: Object,
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
