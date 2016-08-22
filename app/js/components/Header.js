import * as ReactRedux from 'react-redux';
import HeaderUi from '@components/HeaderUi';
import actionCreators from '@js/actionCreators';


const mapStateToProps = state => ({
  status: state.status,
});


export default ReactRedux.connect(
  mapStateToProps
)(HeaderUi);
