//TODO:
const privatePropertySet = Symbol('privatePropertySet');

function parameterCanNotBeNull(name) {
  throw new Error(`${name} can not be null!`);
}
