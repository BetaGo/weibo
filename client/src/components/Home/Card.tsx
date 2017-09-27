import * as React from 'react';
import { withStyles, StyleRules, StyleRulesCallback } from 'material-ui/styles';
import { ClassNameMap } from 'material-ui';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import GradeIcon from 'material-ui-icons/Grade';
import { Link } from 'react-router-dom';

import ActionBar from './ActionBar';

import { EmotionsState } from '../../redux/modules/emotions';

import { parseTweet } from '../../utils/parseTweet';

const styles: StyleRules | StyleRulesCallback = {
  root: {
    margin: '1px 0'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: '1em'
  },
  avatar: {
    margin: '0 0.3em',
    flexGrow: 1
  },
  contentContainer: {
    margin: '0 0.3em',
    flexGrow: 7,
    width: '100%',
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '0.15em'
  },
  userName: {
    textDecoration: 'none',
    color: '#14171a',
    fontWeight: 500,
  },
  screenName: {
    textDecoration: 'none',
    color: '#657786'
  }
};

type Props = {
  classes: ClassNameMap,
  text: string,
  name: string,
  screen_name: string,
  profile_image_url: string,
  reposts_count: number,
  comments_count: number,
  attitudes_count: number,
  emotions: EmotionsState
};

class Card extends React.PureComponent<Props> {
  render() {
    const { classes } = this.props;
    const {
      text,
      name,
      screen_name,
      profile_image_url,
      reposts_count,
      comments_count,
      attitudes_count,
      emotions
    } = this.props;
    let actionBarProps = { reposts_count, comments_count, attitudes_count };
    return (
      <Paper elevation={1} className={classes.root}>
        <div className={classes.container}>
          <div className={classes.avatar}>
            <Link to={`/${screen_name}`}>
              <Avatar alt="avatar" src={profile_image_url} />
            </Link>
          </div>
          <div className={classes.contentContainer}>
            <div className={classes.contentHeader}>
              <Link to={screen_name} className={classes.userName}>
                {name}
              </Link>
              <GradeIcon />
              <Link to={screen_name} className={classes.screenName}>
                @{screen_name}
              </Link>
            </div>
            {/* 注意xss */}
            <div
              dangerouslySetInnerHTML={{ __html: parseTweet(text, emotions) }}
            />
            <ActionBar {...actionBarProps} />
          </div>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(Card);