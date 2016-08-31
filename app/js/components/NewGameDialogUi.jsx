import React from 'react';
import Immutable from 'immutable';
import TextButton from '@components/TextButton';
import FormInput from '@components/FormInput';


const configPresets = {
  easy: {
    rows: 8,
    columns: 8,
    mines: 8,
  },
  medium: {
    rows: 16,
    columns: 16,
    mines: 32,
  },
  hard: {
    rows: 32,
    columns: 32,
    mines: 128,
  },
};

class NewGameDialogUi extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rows: props.config.rows,
      columns: props.config.columns,
      mines: props.config.mines,
    };

    this.choosePreset = this.choosePreset.bind(this);
    this.changeConfig = this.changeConfig.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  choosePreset(e) {
    this.setState(configPresets[e.target.name]);
  }

  changeConfig(name, value) {
    if (typeof value === 'number' && value >= 1) {
      if (name === 'mines') {
        value = Math.min(value, 1024);
      }
      else {
        value = Math.min(value, 64);
      }

      this.setState({
        [name]: value,
      });
    }
  }

  confirm() {
    this.props.setBoardConfig(this.state);
    this.props.startNewGame();
  }

  render() {
    if (!this.props.uiState.showNewGameDialog) {
      return null;
    }

    return <div style={styles.wrapper} >
      <div style={styles.messageWrapper} >
        <div style={styles.message} >
          <span style={styles.title} >
            Settings
          </span>

          <div style={styles.messageRow} >
            <TextButton
              light
              name="easy"
              onClick={this.choosePreset} >
              Easy
            </TextButton>
            <TextButton
              light
              name="medium"
              onClick={this.choosePreset} >
              Medium
            </TextButton>
            <TextButton
              light
              name="hard"
              onClick={this.choosePreset} >
              Hard
            </TextButton>
          </div>

          <div style={styles.messageRow} >
            Rows:
            <FormInput name="rows"
              autoFocus
              tabIndex={10}
              value={this.state.rows}
              callback={this.changeConfig}
              confirm={this.confirm} />
          </div>
          <div style={styles.messageRow} >
            Columns:
            <FormInput name="columns"
              tabIndex={20}
              value={this.state.columns}
              callback={this.changeConfig}
              confirm={this.confirm} />
          </div>
          <div style={styles.messageRow} >
            Mines:
            <FormInput name="mines"
              tabIndex={30}
              value={this.state.mines}
              callback={this.changeConfig}
              confirm={this.confirm} />
          </div>

          <div style={styles.confirmWrapper} >
            <TextButton
              tabIndex={40}
              light
              onClick={this.confirm} >
              Play
            </TextButton>
          </div>
        </div>
      </div>
    </div>;
  }
}

NewGameDialogUi.propTypes = {
  config: React.PropTypes.instanceOf(Immutable.Record).isRequired,
  setBoardConfig: React.PropTypes.func.isRequired,
  startNewGame: React.PropTypes.func.isRequired,
  uiState: React.PropTypes.instanceOf(Immutable.Record).isRequired,
};

const styles = {
  wrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
  },
  messageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 25,
    backgroundColor: 'rgba(0,0,0,0.8)',
    fontFamily: 'Roboto Condensed, sans-serif',
    fontSize: 24,
    color: 'white',
    pointerEvents: 'auto',
    boxSizing: 'border-box',
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
    width: 350,
    maxWidth: '100%',
  },
  title: {
    marginBottom: '1em',
  },
  messageRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5em',
  },
  confirmWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
};


export default NewGameDialogUi;
