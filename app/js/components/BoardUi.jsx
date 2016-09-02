import React from 'react';
import Immutable from 'immutable';
import Field from '@components/Field';
import {
  BoardConfig,
} from '@js/dataTypes';


class BoardRow extends React.PureComponent {
  render() {
    return <div className="board__row" >
      {this.props.children}
    </div>;
  }
}

BoardRow.propTypes = {
  children: React.PropTypes.node.isRequired,
};

class BoardUi extends React.PureComponent {
  render() {
    const rows = [];
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

    for (let i = 0; i < this.props.config.rows; i++) {
      const children = fields.slice(i * this.props.config.rows, (i * this.props.config.rows) + this.props.config.columns);

      rows[i] = <BoardRow key={i} >
        {children}
      </BoardRow>;
    }

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
