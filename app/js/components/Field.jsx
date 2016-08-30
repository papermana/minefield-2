import React from 'react';


const contentImage = name => <img src={`assets/${name}.svg`}
  width="50"
  height="50"
  draggable="false" />;

class Field extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false,
    };

    this.hoverStartFunc = this.hoverStartFunc.bind(this);
    this.hoverEndFunc = this.hoverEndFunc.bind(this);
    this.clickField = this.clickField.bind(this);
    this.rightClickField = this.rightClickField.bind(this);
  }

  hoverStartFunc() {
    this.setState({
      hovered: true,
    });
  }

  hoverEndFunc() {
    this.setState({
      hovered: false,
    });
  }

  clickField() {
    if (this.props.status === 'STATE_GOING' && this.props.action === undefined) {
      this.props.clickField(this.props.id);
    }
  }

  rightClickField(e) {
    e.preventDefault();

    if (this.props.status === 'STATE_GOING' && this.props.action !== 'clicked') {
      this.props.rightClickField(this.props.id);
    }
  }

  render() {
    let style = styles.field;
    let content;

    if (this.props.action === 'clicked') {
      content = this.props.value;

      if (content === 'mine') {
        content = contentImage('mine-exploded');
      }

      if (content === 0) {
        style = styles.fieldClicked;
      }
      else {
        style = styles.fieldClickedNonNull;
      }
    }
    else if (this.props.action === 'flagged') {
      content = contentImage('flag');
    }
    else if (
      this.props.action === undefined &&
      (
        this.props.status === 'STATE_WON' ||
        this.props.status === 'STATE_LOST'
      )
    ) {
      if (this.props.value === 'mine') {
        content = contentImage('mine');
      }
      else {
        content = this.props.value;
      }
    }

    if (
      this.props.action !== 'clicked' &&
      this.props.status === 'STATE_GOING' &&
      this.state.hovered
    ) {
      style = styles.fieldHovered;
    }

    return <button style={style}
      onMouseOver={this.hoverStartFunc}
      onMouseOut={this.hoverEndFunc}
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

const styles = {
  field: {
    width: 50,
    height: 50,
    backgroundColor: 'rgb(222, 215, 223)',
    fontFamily: 'Roboto Condensed, sans-serif',
    fontSize: 24,
    MsUserSelect: 'none',
    MoztUserSelect: 'none',
    WebkitUserSelect: 'none',
    userSelect: 'none',
    //  Remove default button styles:
    border: 'none',
    outline: 'none',
    padding: 0,
  },
};

styles.fieldHovered = Object.assign({}, styles.field, {
  backgroundColor: 'rgba(192, 185, 193, 1)',
  cursor: 'pointer',
});

styles.fieldClicked = Object.assign({}, styles.field, {
  backgroundColor: 'transparent',
  cursor: 'default',
});

styles.fieldClickedNonNull = Object.assign({}, styles.fieldClicked, {
  backgroundColor: 'rgba(222, 215, 223, 0.6)',
});


export default Field;
