import React from 'react';
import Immutable from 'immutable';
import formatTime from '@utils/formatTime';


const HeaderUi = props => {
  return <div style={styles.wrapper} >
    <div style={styles.staticBar} >
      <div style={styles.gameInfo} >
        <div style={styles.timer} >
          {formatTime(props.status.time)}
        </div>
        <div style={styles.flagsCounter} >
          {props.status.flagsDeployed}
        </div>
      </div>
    </div>
  </div>;
};

HeaderUi.propTypes = {
  status: React.PropTypes.instanceOf(Immutable.Record).isRequired,
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
