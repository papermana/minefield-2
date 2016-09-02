import React from 'react';
import {
  gameStates,
} from '@js/dataTypes';


class MessageDisplayUi extends React.PureComponent {
  render() {
    let message;

    if (this.props.state === gameStates.STATE_PAUSED) {
      message = 'Paused';
    }
    else if (this.props.state === gameStates.STATE_LOST) {
      message = 'BOOM! You lose';
    }
    else if (this.props.state === gameStates.STATE_WON) {
      message = 'Congratulations! You win';
    }

    message = message === undefined ? null : <div className="message-display__message" >
      {message}
    </div>;

    return <div className="message-display" >
      {message}
    </div>;
  }
}

MessageDisplayUi.propTypes = {
  state: React.PropTypes.string.isRequired,
};


export default MessageDisplayUi;
