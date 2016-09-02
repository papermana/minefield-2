import React from 'react';
import Header from '@components/Header';
import Board from '@components/Board';
import MessageDisplay from '@components/MessageDisplay';
import NewGameDialog from '@components/NewGameDialog';
import {
  BoardConfig,
} from '@js/dataTypes';


//  Keep this in sync with Sass code in `_variables.scss`:
const FIELD_SIZE = 50;

class AppUi extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dimensions: {
        width: undefined,
        height: undefined,
      },
    };

    this.getDimensionsBuffer = this.getDimensionsBuffer.bind(this);
    this.getDimensions = this.getDimensions.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.getDimensionsBuffer);

    this.getDimensionsBuffer();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getDimensionsBuffer);
  }

  getDimensionsBuffer() {
    if (this._gdBuffer) {
      cancelAnimationFrame(this._gdBuffer);
    }

    this._gdBuffer = requestAnimationFrame(this.getDimensions);
  }

  getDimensions() {
    this.setState({
      dimensions: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  }

  render() {
    let style;

    if (this.props.boardConfig.columns * FIELD_SIZE < this.state.dimensions.width) {
      style = styles.centered;
    }

    return <div className="app"
      style={style} >
      <Header />
      <MessageDisplay />
      <NewGameDialog />

      <Board />
    </div>;
  }
}

AppUi.propTypes = {
  boardConfig: React.PropTypes.instanceOf(BoardConfig).isRequired,
};

const styles = {
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
};


export default AppUi;
