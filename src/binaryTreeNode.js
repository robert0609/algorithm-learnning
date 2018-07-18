
const privatePropertySet = Symbol('privatePropertySet');

function parameterCanNotBeNull(name) {
  throw new Error(`${name} can not be null!`);
}

export class BinaryTreeNode {
  constructor(value = parameterCanNotBeNull(), {
    leftChild = null,
    rightChild = null
  } = {}) {
    this.value = value;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}
