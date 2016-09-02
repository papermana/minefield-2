import React from 'react';
import Immutable from 'immutable';
import {
  gameStates,
} from '@js/dataTypes';
import IconButton from '@components/IconButton';
import TextButton from '@components/TextButton';
import formatTime from '@utils/formatTime';


class HeaderUi extends React.PureComponent {
  constructor(props) {
    super(props);

    this.pauseUnpause = this.pauseUnpause.bind(this);
  }

  componentDidMount() {
    this.props.startTimer();
  }

  pauseUnpause() {
    if (this.props.status.state === gameStates.STATE_GOING) {
      this.props.pauseGame();
    }
    else if (this.props.status.state === gameStates.STATE_PAUSED) {
      this.props.unpauseGame();
    }
  }

  render() {
    const topbarExtendedClass = this.props.uiState.topbarActive
      ? 'topbar__extended topbar__extended--active'
      : 'topbar__extended';
    const pauseUnpauseButton = this.props.status.state === gameStates.STATE_GOING
      ? 'pause'
      : 'play';

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
        <div className="gameinfo" >
          <IconButton action={pauseUnpauseButton}
            onClick={this.pauseUnpause} />
          <div className="gameinfo__flags-counter" >
            {this.props.status.flagsDeployed}
          </div>
          <div className="gameinfo__timer" >
            {formatTime(this.props.status.time)}
          </div>
        </div>
      </div>
    </header>;
  }
}

HeaderUi.propTypes = {
  hideTopbar: React.PropTypes.func.isRequired,
  pauseGame: React.PropTypes.func.isRequired,
  showTopbar: React.PropTypes.func.isRequired,
  startNewGame: React.PropTypes.func.isRequired,
  startTimer: React.PropTypes.func.isRequired,
  status: React.PropTypes.instanceOf(Immutable.Record).isRequired,
  uiState: React.PropTypes.instanceOf(Immutable.Record).isRequired,
  unpauseGame: React.PropTypes.func.isRequired,
};


export default HeaderUi;
