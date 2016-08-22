import clickField, {
  CLICK_FIELD,
} from './clickField';
import rightClickField, {
  FLAG_FIELD,
  UNFLAG_FIELD,
} from './rightClickField';

const types = {
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

actionCreators.rightClickField = rightClickField;
types[FLAG_FIELD] = FLAG_FIELD;
types[UNFLAG_FIELD] = UNFLAG_FIELD;


export default actionCreators;
export {
  types,
};
