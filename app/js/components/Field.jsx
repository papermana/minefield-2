import React from 'react';


const getBackgroundColor = value => `rgba(222, 215, 223, ${value * 0.075})`;

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
    if (this.props.action === undefined) {
      this.props.clickField(this.props.id);
    }
  }

  rightClickField(e) {
    e.preventDefault();

    this.props.rightClickField(this.props.id);
  }

  render() {
    let style = styles.field;
    let content;

    if (this.props.action === 'clicked') {
      style = styles.fieldClicked;

      content = this.props.value;

      if (content === 'mine') {
        content = <img src="assets/mine-exploded.svg"
          width="50"
          height="50" />;
      }

      if (content !== 0) {
        style = Object.assign({}, styles.fieldClicked);
        style.backgroundColor = getBackgroundColor(content === 'mine' ? 9 : 8);
      }
    }
    else if (this.props.action === 'flagged') {
      content = <img src="assets/flag.svg"
        width="50"
        height="50" />;
    }
    else if (this.state.hovered) {
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
  value: React.PropTypes.oneOfType([
    React.PropTypes.oneOf(['mine']),
    React.PropTypes.number,
  ]).isRequired,
  id: React.PropTypes.number.isRequired,
  action: React.PropTypes.oneOf([
    undefined,
    'flagged',
    'clicked',
  ]),
  clickField: React.PropTypes.func.isRequired,
  rightClickField: React.PropTypes.func.isRequired,
};

const styles = {
  field: {
    width: 50,
    height: 50,
    backgroundColor: 'rgb(222, 215, 223)',
    fontSize: 24,
    cursor: 'pointer',
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
});

styles.fieldClicked = Object.assign({}, styles.field, {
  backgroundColor: 'transparent',
  cursor: 'default',
});


export default Field;
