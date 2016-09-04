import React from 'react';
import Immutable from 'immutable';
import {
  gameStates,
} from '@js/dataTypes';
import IconButton from '@components/IconButton';
import formatTime from '@utils/formatTime';

class GameinfoUi extends React.PureComponent {
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
    const pauseUnpauseButton = this.props.status.state === gameStates.STATE_GOING
      ? 'pause'
      : 'play';

    return <div className="gameinfo" >
      <IconButton action={pauseUnpauseButton}
        onClick={this.pauseUnpause} />
      <div className="gameinfo__flags-counter" >
        {this.props.status.flagsDeployed}
      </div>
      <div className="gameinfo__timer" >
        {formatTime(this.props.status.time)}
      </div>
    </div>;
  }
}

GameinfoUi.propTypes = {
  pauseGame: React.PropTypes.func.isRequired,
  startTimer: React.PropTypes.func.isRequired,
  status: React.PropTypes.instanceOf(Immutable.Record).isRequired,
  unpauseGame: React.PropTypes.func.isRequired,
};


export default GameinfoUi;
