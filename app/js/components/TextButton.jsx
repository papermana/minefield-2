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
    const style = this.state.hovered ? styles.buttonHover : styles.button;

    return <button style={style}
      onMouseOver={this.hoverStart}
      onMouseOut={this.hoverEnd}
      {...this.props} >
      {this.props.children}
    </button>;
  }
}

TextButton.propTypes = {
  children: React.PropTypes.string.isRequired,
};

const styles = {
  button: {
    padding: 12,
    backgroundColor: 'transparent',
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

styles.buttonHover = Object.assign({}, styles.button, {
  backgroundColor: 'rgba(0,0,0,0.05)',
});


export default TextButton;
