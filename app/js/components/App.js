import * as ReactRedux from 'react-redux';
import AppUi from '@components/AppUi';


const mapStateToProps = state => ({
  boardConfig: state.boardConfig,
});


export default ReactRedux.connect(mapStateToProps)(AppUi);
