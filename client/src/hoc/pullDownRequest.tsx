import * as React from 'react';
import { Component } from 'react';
import { ClassNameMap } from 'material-ui';
import { withStyles, StyleRules, StyleRulesCallback } from 'material-ui/styles';
import ArrowUpIcon from 'material-ui-icons/KeyboardArrowUp';
import ArrowDownIcon from 'material-ui-icons/KeyboardArrowDown';
// import { Motion, spring } from 'react-motion';

const styles: StyleRules | StyleRulesCallback = {
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
  classes: ClassNameMap
};

type State = {
  top: number
};

export default function pullDownRequest(requestAction: Function)
  : (BaseComponent: React.ComponentType) => React.ComponentClass {
  function enhance(BaseComponent: React.ComponentClass): React.ComponentClass {
    class PullDownRequest extends Component<Props, State> {
      state = {
        top: 0
      };

      touchStartY: number | null;

      ontouchstart = (e: React.TouchEvent<HTMLDivElement>) => {
          e.preventDefault();
          e.stopPropagation();
          this.touchStartY = e.touches[0].pageY;
      }

      ontouchmove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (this.touchStartY) {
          e.preventDefault();
          e.stopPropagation();
          const curTouchY = e.touches[0].pageY;
          const deltaY = curTouchY - this.touchStartY;
          const top = deltaY / 2;
          this.setState({
            top
          });
        }
      }

      ontouchend = (e: React.TouchEvent<HTMLDivElement>) => {
        if (this.touchStartY) {
          e.preventDefault();
          e.stopPropagation();
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
          this.touchStartY = null;
        }
      }

      render() {
        const { classes } = this.props;
        return (
          // <Motion
          //   style={{
          //     x: spring(this.state.top, { stiffness: 200, damping: 20 })
          //   }}
          // >
          //   {({ x }) => (
          //     <div
          //       className={classes.root}
          //       style={{ top: x }}
          //       onTouchStart={this.ontouchstart}
          //       onTouchMove={this.ontouchmove}
          //       onTouchEnd={this.ontouchend}
          //     >
          //       <div className={classes.pointerContainer}>
          //         <i className={classes.pointer}>
          //           {this.state.top > 50 ? <ArrowUpIcon /> : <ArrowDownIcon />}
          //         </i>
          //       </div>
          //       <BaseComponent {...this.props} />
          //     </div>
          //   )}
          // </Motion>
          <div
            className={classes.root}
            style={{ transform: `translate3d(0,${this.state.top}px, 0)` }}
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
        );
      }
    }

    return withStyles(styles)(PullDownRequest);
  }
  return enhance;
}