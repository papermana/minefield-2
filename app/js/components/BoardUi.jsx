import React from 'react';
import Immutable from 'immutable';
import Field from '@components/Field';


function BoardUi(props) {
  const fields = props.layout
  .map((field, i) => (
    <Field key={i}
      value={field}
      action={props.playerActions.get(i)} />
  ));

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
    display: 'flex',
    flexWrap: 'wrap',
    width: 500,
    height: 500,
    maxWidth: '90vh',
    maxHeight: '90vh',
    backgroundColor: 'transparent',
    borderRadius: 4,
    fontSize: 32,
    textAlign: 'center',
    lineHeight: 48,
    overflow: 'auto',
  },
};


export default BoardUi;
