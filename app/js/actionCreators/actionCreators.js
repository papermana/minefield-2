import clickField from './clickField';
import {
  CLICK_FIELD,
} from './clickField';

const types = {
  //  data: id of a field:
  FLAG_FIELD: 'FLAG_FIELD',
};

const actionCreators = {};

for (const type in types) {
  const name = type.toLowerCase().replace(/_(\w)/, (match, s1) => s1.toUpperCase());

  actionCreators[name] = data => ({
    type,
    data,
  });
}

actionCreators.clickField = clickField;
types[CLICK_FIELD] = CLICK_FIELD;


export default actionCreators;
export {
  types,
};
