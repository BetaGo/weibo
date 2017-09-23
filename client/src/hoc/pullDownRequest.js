// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';
import { withStyles } from 'material-ui/styles';
import ArrowUpIcon from 'material-ui-icons/KeyboardArrowUp';
import ArrowDownIcon from 'material-ui-icons/KeyboardArrowDown';
import { Motion, spring } from 'react-motion';

const styles = {
  root: {
    position: 'relative'
  },
  pointerContainer: {
    position: 'relative',
    display: 'flex',
    height: 50,
    width: '100%'
  },
  pointer: {
    margin: 'auto'
  }
};

type Props = {
  classes: Object
};

type State = {
  top: number
};

export default function pullDownRequest(requestAction: Function) {
  function enhance(BaseComponent: ComponentType<any>) {
    class PullDownRequest extends Component<Props, State> {
      state = {
        top: 0
      };

      touchStartY: number;
      touchMoveY: number;
      touchEndY: number;

      ontouchstart = (e: TouchEvent) => {
        this.touchStartY = e.touches[0].pageY;
      };

      ontouchmove = (e: TouchEvent) => {
        const curTouchY = e.touches[0].pageY;
        const deltaY = curTouchY - this.touchStartY;
        const top = deltaY / 2;
        this.setState({
          top
        });
      };

      ontouchend = (e: TouchEvent) => {
        const curTouchY = e.changedTouches[0].pageY;
        const deltaY = curTouchY - this.touchStartY;
        if (deltaY > 50) {
          requestAction();
          this.setState({
            top: 0
          });
        } else {
          this.setState({
            top: 0
          });
        }
      };

      render() {
        const { classes } = this.props;
        return (
          <Motion
            style={{
              x: spring(this.state.top, { stiffness: 200, damping: 20 })
            }}
          >
            {({ x }) => (
              <div
                className={classes.root}
                style={{ top: x }}
                onTouchStart={this.ontouchstart}
                onTouchMove={this.ontouchmove}
                onTouchEnd={this.ontouchend}
              >
                <div className={classes.pointerContainer}>
                  <i className={classes.pointer}>
                    {this.state.top > 50 ? <ArrowUpIcon /> : <ArrowDownIcon />}
                  </i>
                </div>
                <BaseComponent {...this.props} />
              </div>
            )}
          </Motion>
        );
      }
    }

    return withStyles(styles)(PullDownRequest);
  }
  return enhance;
}
