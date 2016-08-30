import React from 'react';
import Immutable from 'immutable';
import Field from '@components/Field';


class BoardUi extends React.PureComponent {
  render() {
    const fields = this.props.layout
    .map((field, i) => (
      <Field key={i}
        value={field}
        id={i}
        action={this.props.playerActions.get(i)}
        clickField={this.props.clickField}
        rightClickField={this.props.rightClickField}
        status={this.props.status} />
    ));

    return <div style={styles.board} >
      {fields}
    </div>;
  }
}

BoardUi.propTypes = {
  clickField: React.PropTypes.func.isRequired,
  layout: React.PropTypes.instanceOf(Immutable.List).isRequired,
  playerActions: React.PropTypes.instanceOf(Immutable.List).isRequired,
  rightClickField: React.PropTypes.func.isRequired,
  status: React.PropTypes.string.isRequired,
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
