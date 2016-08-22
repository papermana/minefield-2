import React from 'react';
import Immutable from 'immutable';
import Field from '@components/Field';


const BoardUi = props => {
  const fields = props.layout
  .map((field, i) => (
    <Field key={i}
      value={field}
      id={i}
      action={props.playerActions.get(i)}
      clickField={props.clickField}
      rightClickField={props.rightClickField} />
  ));

  return <div style={styles.board} >
    {fields}
  </div>;
};

BoardUi.propTypes = {
  clickField: React.PropTypes.func.isRequired,
  layout: React.PropTypes.instanceOf(Immutable.List).isRequired,
  playerActions: React.PropTypes.instanceOf(Immutable.List).isRequired,
  rightClickField: React.PropTypes.func.isRequired,
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
  },
};


export default BoardUi;
