import React from 'react';
import Immutable from 'immutable';
import IconButton from '@components/IconButton';
import formatTime from '@utils/formatTime';


class HeaderUi extends React.PureComponent {
  componentDidMount() {
    this.props.startTimer();
  }

  render() {
    return <div style={styles.wrapper} >
      <div style={styles.staticBar} >
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
          <div style={styles.timer} >
            {formatTime(this.props.status.time)}
          </div>
          <div style={styles.flagsCounter} >
            {this.props.status.flagsDeployed}
          </div>
        </div>
      </div>
    </div>;
  }
}

HeaderUi.propTypes = {
  status: React.PropTypes.instanceOf(Immutable.Record).isRequired,
  uiState: React.PropTypes.instanceOf(Immutable.Record).isRequired,
  startTimer: React.PropTypes.func.isRequired,
  showTopbar: React.PropTypes.func.isRequired,
  hideTopbar: React.PropTypes.func.isRequired,
};

const styles = {
  wrapper: {
    width: '100vw',
    height: 75,
    padding: 10,
    boxSizing: 'border-box',
  },
  staticBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    fontSize: 24,
  },
  message: {
    textAlign: 'center',
  },
  gameInfo: {
    display: 'flex',
  },
  flagsCounter: {
    paddingLeft: 24,
    backgroundImage: 'url(assets/flag.svg)',
    backgroundSize: 24,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left',
  },
};


export default HeaderUi;
