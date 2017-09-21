import { createSelector } from 'reselect';

const tweetsSelector = state => state.entities.tweets;
const usersSelector = state => state.entities.users;

const tweetCardInfoSelector = createSelector(
  tweetsSelector,
  usersSelector,
  (tweets, users) => {
    let cardInfo = [];
    
  }
)
