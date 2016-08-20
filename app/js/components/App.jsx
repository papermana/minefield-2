import React from 'react';
import Board from '@components/Board';


function App(props) {
  return <div style={styles.app} >
    <Board />
  </div>;
}

const styles = {
  app: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
  },
};


export default App;
