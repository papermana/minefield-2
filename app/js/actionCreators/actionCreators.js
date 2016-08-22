import * as types from './types';
import clickField from './clickField';
import rightClickField from './rightClickField';
import startTimer from './startTimer';


const actionCreators = {};

for (const type in types) {
  const name = type.toLowerCase().replace(/_(\w)/, (match, s1) => s1.toUpperCase());

  actionCreators[name] = data => ({
    type,
    data,
  });
}

actionCreators.clickField = clickField;
actionCreators.rightClickField = rightClickField;
actionCreators.startTimer = startTimer;


export default actionCreators;
export {
  types,
};
