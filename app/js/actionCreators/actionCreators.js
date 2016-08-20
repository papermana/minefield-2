const types = {
  //  data: id of a field:
  FLAG_FIELD: 'FLAG_FIELD',
  //  data: id of a field:
  CLICK_FIELD: 'CLICK_FIELD',
};

const actionCreators = {};

for (const type in types) {
  const name = type.toLowerCase().replace(/_(\w)/, (match, s1) => s1.toUpperCase());

  actionCreators[name] = data => ({
    type,
    data,
  });
}


export default actionCreators;
export {
  types,
};
