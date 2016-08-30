import React from 'react';
import {
  gameStates,
} from '@js/dataTypes';


const MessageDisplayUi = props => {
  let message;

  if (props.state === gameStates.STATE_PAUSED) {
    message = 'Paused';
  }
  else if (props.state === gameStates.STATE_LOST) {
    message = 'BOOM! You lose';
  }
  else if (props.state === gameStates.STATE_WON) {
    message = 'Congratulations! You win';
  }

  message = message === undefined ? null : <div style={styles.messageBar} >
    {message}
  </div>;

  return <div style={styles.wrapper} >
    {message}
  </div>;
};

MessageDisplayUi.propTypes = {
  state: React.PropTypes.string.isRequired,
};

const styles = {
  wrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
  },
  messageBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 56,
    backgroundColor: 'rgba(0,0,0,0.8)',
    fontFamily: 'Roboto Condensed, sans-serif',
    fontSize: 24,
    color: 'white',
    pointerEvents: 'auto',
  },
};


export default MessageDisplayUi;
