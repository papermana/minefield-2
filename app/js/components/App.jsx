import React from 'react';
import Header from '@components/Header';
import Board from '@components/Board';
import MessageDisplay from '@components/MessageDisplay';


const App = () => {
  return <div style={styles.app} >
    <Header />
    <div style={styles.boardWrapper} >
      <Board />
    </div>
    <MessageDisplay />
  </div>;
};

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
  },
  boardWrapper: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};


export default App;
