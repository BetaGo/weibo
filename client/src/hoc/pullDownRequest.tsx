import * as React from 'react';
import { withStyles, StyleRules, StyleRulesCallback, WithStyles } from 'material-ui/styles';
import ArrowUpIcon from 'material-ui-icons/KeyboardArrowUp';
import ArrowDownIcon from 'material-ui-icons/KeyboardArrowDown';
// import { Motion, spring } from 'react-motion';

const styles: StyleRules | StyleRulesCallback = {
  root: {
    position: 'relative',
    marginTop: -50
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

type State = {
  top: number
};

export default function pullDownRequest(requestAction: Function) {
  function enhance(BaseComponent: React.ComponentType) {
    class WithPullDownRequest extends React.Component<WithStyles, State> {
      static displayName: string;
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
    WithPullDownRequest.displayName = `PulldownRequest(${getDisplayName(BaseComponent)})`;
    return withStyles(styles)(WithPullDownRequest);
  }

  function getDisplayName(WrappedComponent: React.ComponentType) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }
  
  return enhance;
}
