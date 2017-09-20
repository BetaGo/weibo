// @flow
import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import GradeIcon from 'material-ui-icons/Grade';
import { Link } from 'react-router-dom';
import ActionBar from './ActionBar';

import { parseTweet } from '../../utils/parseTweet';

const styles = {
  root: {
    margin: '2px 0'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: '1em'
  },
  avatar: {
    margin: '0 0.3em',
    flexGrow: '1'
  },
  content: {
    margin: '0 0.3em',
    flexGrow: '7'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '0.15em'
  },
  name: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#14171a'
  },
  screenName: {
    textDecoration: 'none',
    color: '#657786'
  }
};

type Props = {
  classes: Object,
  text: string,
  name: string,
  screen_name: string,
  profile_image_url: string
};

class Card extends Component<Props> {
  render() {
    const { classes } = this.props;
    const { text, name, screen_name, profile_image_url } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container} elevation="1">
          <div className={classes.avatar}>
            <Link to={`/${screen_name}`}>
              <Avatar alt="avatar" src={profile_image_url} />
            </Link>
          </div>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <Link to={screen_name} className={classes.name}>
                {name}
              </Link>
              <GradeIcon />
              <Link to={screen_name} className={classes.screenName}>
                @{screen_name}
              </Link>
            </div>
            {/* 注意xss */}
            <div dangerouslySetInnerHTML={{ __html: parseTweet(text) }} />
            <ActionBar />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Card);