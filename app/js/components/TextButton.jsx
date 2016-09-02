import React from 'react';


class TextButton extends React.PureComponent {
  render() {
    const propsToPass = Object.assign({}, this.props);

    delete propsToPass.light;

    return <button {...propsToPass}
      className={`button button--text ${this.props.light ? 'button--light' : ''}`} >
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


export default TextButton;
