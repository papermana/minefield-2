import React from 'react';
import Immutable from 'immutable';
import IconButton from '@components/IconButton';
import TextButton from '@components/TextButton';
import Gameinfo from '@components/Gameinfo';


class HeaderUi extends React.PureComponent {
  render() {
    const topbarExtendedClass = this.props.uiState.topbarActive
      ? 'topbar__extended topbar__extended--active'
      : 'topbar__extended';

    return <header className="topbar" >
      <div className={topbarExtendedClass} >
        <IconButton action="back"
          onClick={this.props.hideTopbar} />
        <TextButton
          onClick={this.props.startNewGame} >
          New Game
        </TextButton>
      </div>
      <div className="topbar__basic" >
        <IconButton action="menu"
          onClick={this.props.showTopbar} />
        <Gameinfo />
      </div>
    </header>;
  }
}

HeaderUi.propTypes = {
  hideTopbar: React.PropTypes.func.isRequired,
  showTopbar: React.PropTypes.func.isRequired,
  startNewGame: React.PropTypes.func.isRequired,
  uiState: React.PropTypes.instanceOf(Immutable.Record).isRequired,
};


export default HeaderUi;
