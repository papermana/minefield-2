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
    this.onWrapperClick = this.onWrapperClick.bind(this);
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

  onWrapperClick(e) {
    if (
      e.target !== this.refs.messageWrapper &&
      !this.refs.messageWrapper.contains(e.target)
    ) {
      this.props.hide();
    }
  }

  render() {
    if (!this.props.uiState.showNewGameDialog) {
      return null;
    }

    return <div className="new-game-dialog"
      onClick={this.onWrapperClick} >
      <div ref="messageWrapper" className="new-game-dialog__message" >
        <div className="new-game-dialog__form" >
          <span className="new-game-dialog__form-title" >
            Settings
          </span>

          <div className="new-game-dialog__form-row" >
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

          <div className="new-game-dialog__form-row" >
            Rows:
            <FormInput name="rows"
              autoFocus
              tabIndex={10}
              value={this.state.rows}
              callback={this.changeConfig}
              confirm={this.confirm} />
          </div>
          <div className="new-game-dialog__form-row" >
            Columns:
            <FormInput name="columns"
              tabIndex={20}
              value={this.state.columns}
              callback={this.changeConfig}
              confirm={this.confirm} />
          </div>
          <div className="new-game-dialog__form-row" >
            Mines:
            <FormInput name="mines"
              tabIndex={30}
              value={this.state.mines}
              callback={this.changeConfig}
              confirm={this.confirm} />
          </div>

          <div className="new-game-dialog__form-buttons" >
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
  hide: React.PropTypes.func.isRequired,
  setBoardConfig: React.PropTypes.func.isRequired,
  startNewGame: React.PropTypes.func.isRequired,
  uiState: React.PropTypes.instanceOf(Immutable.Record).isRequired,
};


export default NewGameDialogUi;
