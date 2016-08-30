import React from 'react';


const src = {
  menu: 'hamburger',
  back: 'back-arrow',
  pause: 'pause',
  play: 'play',
};

const IconButton = props => {
  return <button style={styles.button}
    {...props} >
    <img src={`assets/${src[props.action]}.svg`}
      width="24"
      height="24"
      draggable={false} />
  </button>;
};

IconButton.propTypes = {
  action: React.PropTypes.oneOf([
    'menu',
    'back',
    'pause',
    'play',
  ]).isRequired,
};

const styles = {
  button: {
    width: 24,
    height: 24,
    margin: 12,
    cursor: 'pointer',
    //  Remove default button styles:
    background: 'none',
    border: 'none',
    outline: 'none',
    padding: 0,
  },
};


export default IconButton;
