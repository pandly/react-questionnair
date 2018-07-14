import React from 'react';
import './index.less';

class ShakeTransition extends React.PureComponent {
  state = {
    shake: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shake !== this.props.shake) {
      this.setState({
        shake: true,
      });
      this.timerID = setTimeout(() => this.triggerShake(), 1000);
    };
  }

  triggerShake = () => {
    this.setState({
      shake: false,
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timerID);
  }

  render() {
    const {
      children,
    } = this.props;
    const {
      shake,
    } = this.state;
    return (
      <div className={`shake-transition ${shake ? 'shaked' : ''}`}>
        {this.props.children}
      </div>
    );
  }
}

export default ShakeTransition;