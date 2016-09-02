import React from 'react';


class IconButton extends React.PureComponent {
  render() {
    const propsToPass = Object.assign({}, this.props);

    delete propsToPass.action;

    return <button className={`button button--icon-${this.props.action}`}
      {...propsToPass} />;
  }
}

IconButton.propTypes = {
  action: React.PropTypes.oneOf([
    'menu',
    'back',
    'pause',
    'play',
  ]).isRequired,
};


export default IconButton;
