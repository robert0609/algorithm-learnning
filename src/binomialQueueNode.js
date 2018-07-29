
const privatePropertySet = Symbol('nodePrivatePropertySet');

function parameterCanNotBeNull(name) {
  throw new Error(`${name} can not be null!`);
}

export class BinomialQueueNode {
  constructor(value = parameterCanNotBeNull('value')) {
    this[privatePropertySet] = {
      value,
      forest: []
    };

    Object.defineProperties(this, {
      value: {
        get() {
          return this[privatePropertySet].value;
        },
        enumerable: true
      },
      index: {
        get() {
          return this[privatePropertySet].forest.length;
        },
        enumerable: true
      },
      forest: {
        get() {
          return this[privatePropertySet].forest;
        },
        enumerable: true
      }
    });
  }

  merge(node) {
    if (this.value < node.value) {
      this.forest.push(node);
      return this;
    }
    else if (this.value > node.value) {
      node.forest.push(this);
      return node;
    }
    else {
      throw new Error('两个二项式节点的最小值相等，不能合并');
    }
  }
}
