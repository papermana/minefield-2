import React from 'react';
import Immutable from 'immutable';
import Field from '@components/Field';
import {
  BoardConfig,
} from '@js/dataTypes';


class BoardUi extends React.PureComponent {
  render() {
    const rows = this.props.layout
    .groupBy((field, i) => Math.floor(i / this.props.config.columns))
    .toList()
    .map((row, rowKey) => {
      const children = row
      .map((field, fieldKey) => {
        const id = (this.props.config.columns * rowKey) + fieldKey;

        return <Field key={id}
          value={field}
          id={id}
          action={this.props.playerActions.get(id)}
          clickField={this.props.clickField}
          rightClickField={this.props.rightClickField}
          status={this.props.status} />;
      });

      return <div key={rowKey} className="board__row" >
        {children}
      </div>;
    });

    return <div className="board" >
      {rows}
    </div>;
  }
}

BoardUi.propTypes = {
  clickField: React.PropTypes.func.isRequired,
  config: React.PropTypes.instanceOf(BoardConfig).isRequired,
  layout: React.PropTypes.instanceOf(Immutable.List).isRequired,
  playerActions: React.PropTypes.instanceOf(Immutable.List).isRequired,
  rightClickField: React.PropTypes.func.isRequired,
  status: React.PropTypes.string.isRequired,
};


export default BoardUi;
