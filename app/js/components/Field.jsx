import React from 'react';


function Field(props) {
  return <button style={styles.field} >
    {props.value}
  </button>;
}

Field.propTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.oneOf(['mine']),
    React.PropTypes.number,
  ]).isRequired,
};

const styles = {
  field: {
    width: '10%',
    height: '10%',
  },
};


export default Field;
