import React from 'react';


class Field extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false,
    };

    this.hoverStartFunc = this.hoverStartFunc.bind(this);
    this.hoverEndFunc = this.hoverEndFunc.bind(this);
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

  render() {
    let style = styles.field;
    let content;

    if (this.props.action === 'clicked') {
      style = styles.fieldClicked;

      content = this.props.value;

      if (content === 'mine') {
        content = <img src="assets/mine-exploded.svg"
          width="45"
          height="45" />;
      }
    }
    else if (this.state.hovered) {
      style = styles.fieldHovered;
    }

    return <button style={style}
      onMouseOver={this.hoverStartFunc}
      onMouseOut={this.hoverEndFunc} >
      {content}
    </button>;
  }
}

Field.propTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.oneOf(['mine']),
    React.PropTypes.number,
  ]).isRequired,
  action: React.PropTypes.oneOf([
    undefined,
    'flagged',
    'clicked',
  ]),
};

const styles = {
  field: {
    width: '10%',
    height: '10%',
    backgroundColor: 'rgb(222, 215, 223)',
    cursor: 'pointer',
    MsUserSelect: 'none',
    MoztUserSelect: 'none',
    WebkitUserSelect: 'none',
    userSelect: 'none',
    //  Remove default button styles:
    border: 'none',
    outline: 'none',
  },
};

styles.fieldHovered = Object.assign({}, styles.field, {
  backgroundColor: 'rgba(222, 215, 223, 0.45)',
});

styles.fieldClicked = Object.assign({}, styles.field, {
  backgroundColor: 'transparent',
  cursor: 'default',
});


export default Field;
