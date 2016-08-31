import React from 'react';


class TextButton extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false,
    };

    this.hoverStart = this.hoverStart.bind(this);
    this.hoverEnd = this.hoverEnd.bind(this);
  }

  hoverStart() {
    this.setState({
      hovered: true,
    });
  }

  hoverEnd() {
    this.setState({
      hovered: false,
    });
  }

  render() {
    const propsToPass = Object.assign({}, this.props);

    delete propsToPass.light;

    let style;

    if (this.state.hovered) {
      style = 'buttonHover';
    }
    else {
      style = 'button';
    }

    if (this.props.light) {
      style += 'Light';
    }

    style = styles[style];

    return <button {...propsToPass}
      style={style}
      onMouseOver={this.hoverStart}
      onMouseOut={this.hoverEnd} >
      {this.props.children}
    </button>;
  }
}

TextButton.propTypes = {
  children: React.PropTypes.string.isRequired,
  light: React.PropTypes.bool,
  style: React.PropTypes.objectOf(React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ])),
};

const styles = {
  button: {
    padding: 12,
    backgroundColor: 'transparent',
    fontFamily: 'Roboto Condensed, sans-serif',
    fontSize: 24,
    cursor: 'pointer',
    MsUserSelect: 'none',
    MoztUserSelect: 'none',
    WebkitUserSelect: 'none',
    userSelect: 'none',
    //  Remove default button styles:
    background: 'none',
    border: 'none',
    outline: 'none',
  },
};

styles.buttonLight = Object.assign({}, styles.button, {
  color: 'white',
});

styles.buttonHover = Object.assign({}, styles.button, {
  backgroundColor: 'rgba(0,0,0,0.05)',
});

styles.buttonHoverLight = Object.assign({}, styles.buttonLight, styles.buttonHover, {
  backgroundColor: 'rgba(255,255,255,0.1)',
});


export default TextButton;
