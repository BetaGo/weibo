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

const text =
  '【mysql 证明为什么用limit时，offset很大会影响性能】http://t.cn/R63lloW，分享自 @SegmentFault \n\n像上面这样，需要查询300005次索引节点，查询300005次聚簇索引的数据，最后再将结果过滤掉前300000条，取出最后5条。MySQL耗费了大量随机I/O在查询聚簇索引的数据上，而有300000次随机I/O查询到的数...全文： http://m.weibo.cn/2036070420/4153336640861871 ';
const name = 'Easy';
const screenName = 'Easy';

class Card extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container} elevation="1">
          <div className={classes.avatar}>
            <Link to={`/${screenName}`}>
              <Avatar
                alt="avatar"
                src="http://tva2.sinaimg.cn/crop.0.0.440.440.50/4242e8adjw8elz58g3kyvj20c80c8myg.jpg"
              />
            </Link>
          </div>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <Link to={screenName} className={classes.name}>
                {name}
              </Link>
              <GradeIcon />
              <Link to={screenName} className={classes.screenName}>
                @{screenName}
              </Link>
            </div>
            <div dangerouslySetInnerHTML={{ __html: parseTweet(text) }} />
            <ActionBar />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Card);