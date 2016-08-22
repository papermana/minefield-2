import React from 'react';
import Immutable from 'immutable';
import IconButton from '@components/IconButton';
import TextButton from '@components/TextButton';
import formatTime from '@utils/formatTime';


class HeaderUi extends React.PureComponent {
  componentDidMount() {
    this.props.startTimer();
  }

  render() {
    const topbarStyle = this.props.uiState.topbarActive
      ? styles.topbarActive
      : styles.topbar;

    return <div style={styles.wrapper} >
      <div style={topbarStyle} >
        <IconButton action="back"
          onClick={this.props.hideTopbar} />
        <TextButton
          onClick={this.props.startNewGame} >
          New Game
        </TextButton>
      </div>
      <div style={styles.display} >
        <IconButton action="menu"
          onClick={this.props.showTopbar} />
        <div style={styles.message} >
          {
            this.props.status.state === this.props.status.STATE_PAUSED &&
            'Paused'
          }
          {
            this.props.status.state === this.props.status.STATE_LOST &&
            'BOOM! You lose.'
          }
          {
            this.props.status.state === this.props.status.STATE_WON &&
            'Congratulations! You win'
          }
        </div>
        <div style={styles.gameInfo} >
          <div style={styles.flagsCounter} >
            {this.props.status.flagsDeployed}
          </div>
          <div style={styles.timer} >
            {formatTime(this.props.status.time)}
          </div>
        </div>
      </div>
    </div>;
  }
}

HeaderUi.propTypes = {
  hideTopbar: React.PropTypes.func.isRequired,
  showTopbar: React.PropTypes.func.isRequired,
  startNewGame: React.PropTypes.func.isRequired,
  startTimer: React.PropTypes.func.isRequired,
  status: React.PropTypes.instanceOf(Immutable.Record).isRequired,
  uiState: React.PropTypes.instanceOf(Immutable.Record).isRequired,
};

const styles = {
  wrapper: {
    width: '100vw',
    height: 75,
    boxSizing: 'border-box',
    position: 'relative',
  },
  topbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100vw',
    height: 75,
    padding: 12,
    backgroundColor: 'rgb(202, 150, 213)',
    transform: 'translate3D(0, -75px, 0)',
    transition: 'transform ease-in 0.15s',
    boxSizing: 'border-box',
  },
  display: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    padding: 12,
    fontFamily: 'Roboto Condensed, sans-serif',
    fontSize: 24,
    boxSizing: 'border-box',
  },
  message: {
    textAlign: 'center',
  },
  gameInfo: {
    display: 'flex',
  },
  flagsCounter: {
    margin: 12,
    paddingLeft: 24,
    backgroundImage: 'url(assets/flag.svg)',
    backgroundSize: 24,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left',
  },
  timer: {
    margin: 12,
  },
};

styles.topbarActive = Object.assign({}, styles.topbar, {
  transform: 'translate3D(0, 0, 0)',
});


export default HeaderUi;
