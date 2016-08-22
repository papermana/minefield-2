import React from 'react';


const src = {
  menu: 'assets/hamburger.svg',
  back: 'assets/back-arrow.svg',
};

const IconButton = props => {
  return <button style={styles.button}
    {...props} >
    <img src={src[props.action]}
      width="24"
      height="24" />
  </button>;
};

IconButton.propTypes = {
  action: React.PropTypes.oneOf([
    'menu',
    'back',
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
