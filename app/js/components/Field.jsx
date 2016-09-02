import React from 'react';
import {
  gameStates,
} from '@js/dataTypes';


class Field extends React.PureComponent {
  constructor(props) {
    super(props);

    this.clickField = this.clickField.bind(this);
    this.rightClickField = this.rightClickField.bind(this);
  }

  clickField() {
    if (this.props.status === gameStates.STATE_GOING && this.props.action === undefined) {
      this.props.clickField(this.props.id);
    }
  }

  rightClickField(e) {
    e.preventDefault();

    if (this.props.status === gameStates.STATE_GOING && this.props.action !== 'clicked') {
      this.props.rightClickField(this.props.id);
    }
  }

  render() {
    let className = 'board__field';
    let content;

    if (this.props.action === 'clicked') {
      content = this.props.value !== 'mine' ? this.props.value : undefined;

      if (this.props.value === 'mine') {
        className += ' board__field--exposed board__field--content-mine-exploded';
      }
      else {
        className += ` board__field--exposed board__field--content-${this.props.value}`;
      }
    }
    else if (
      this.props.status === gameStates.STATE_WON ||
      this.props.status === gameStates.STATE_LOST
    ) {
      className += ' board__field--xrayed';

      if (this.props.action === 'flagged') {
        className += ' board__field--content-flag';
      }
      else if (this.props.value === 'mine') {
        className += ' board__field--content-mine';
      }
      else {
        content = this.props.value;
      }
    }
    else if (this.props.action === 'flagged') {
      className += ' board__field--covered board__field--content-flag';
    }
    else {
      className += ' board__field--covered';
    }

    return <button className={className}
      onClick={this.clickField}
      onContextMenu={this.rightClickField} >
      {content}
    </button>;
  }
}

Field.propTypes = {
  action: React.PropTypes.oneOf([
    undefined,
    'flagged',
    'clicked',
  ]),
  clickField: React.PropTypes.func.isRequired,
  id: React.PropTypes.number.isRequired,
  rightClickField: React.PropTypes.func.isRequired,
  status: React.PropTypes.string.isRequired,
  value: React.PropTypes.oneOfType([
    React.PropTypes.oneOf(['mine']),
    React.PropTypes.number,
  ]).isRequired,
};


export default Field;
