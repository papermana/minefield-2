import * as ReactRedux from 'react-redux';
import HeaderUi from '@components/HeaderUi';
import actionCreators from '@js/actionCreators';


const mapStateToProps = state => ({
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
  startTimer() {
    dispatch(actionCreators.startTimer());
  },
});


export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderUi);
