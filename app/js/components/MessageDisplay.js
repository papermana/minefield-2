import * as ReactRedux from 'react-redux';
import MessageDisplayUi from '@components/MessageDisplayUi';


const mapStateToProps = state => ({
  state: state.status.state,
});


export default ReactRedux.connect(mapStateToProps)(MessageDisplayUi);
