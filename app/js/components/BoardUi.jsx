import React from 'react';
import Immutable from 'immutable';
import Field from '@components/Field';


function BoardUi(props) {
  const fields = props.layout
  .map((field, i) => <Field key={i} value={field} />);

  return <div style={styles.board} >
    {fields}
  </div>;
}

BoardUi.propTypes = {
  layout: React.PropTypes.instanceOf(Immutable.List).isRequired,
  playerActions: React.PropTypes.instanceOf(Immutable.List).isRequired,
};

const styles = {
  board: {
    width: 600,
    height: 600,
  },
};


export default BoardUi;
