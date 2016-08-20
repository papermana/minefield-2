import * as ReactRedux from 'react-redux';
import BoardUi from '@components/BoardUi';


const mapStateToProps = state => ({
  layout: state.boardLayout,
  playerActions: state.playerActions,
});

export default ReactRedux.connect(mapStateToProps)(BoardUi);
