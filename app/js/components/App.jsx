import React from 'react';
import Header from '@components/Header';
import Board from '@components/Board';
import MessageDisplay from '@components/MessageDisplay';
import NewGameDialog from '@components/NewGameDialog';


class App extends React.PureComponent {
  render() {
    return <div style={styles.app} >
      <Header />
      <div style={styles.boardWrapper} >
        <Board />
      </div>
      <MessageDisplay />
      <NewGameDialog />
    </div>;
  }
}

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
