/**
 * 零路径长(null path length)定义：任一节点到一个没有两个儿子的节点的最短路径的长
 * 左式堆性质：堆中每一个节点，左儿子的npl不小于右儿子的npl
 */
const privatePropertySet = Symbol('privatePropertySet');

function parameterCanNotBeNull(name) {
  throw new Error(`${name} can not be null!`);
}

export class LeftHeapNode {
  constructor(value = parameterCanNotBeNull(), {
    leftChild = null,
    rightChild = null
  } = {}) {
    this[privatePropertySet] = {
      value,
      parent: null,
      leftChild: null,
      rightChild: null,
      npl: 0
    };

    Object.defineProperties(this, {
      value: {
        get() {
          return this[privatePropertySet].value;
        },
        enumerable: true
      },
      parent: {
        get() {
          return this[privatePropertySet].parent;
        },
        enumerable: false
      },
      leftChild: {
        get() {
          return this[privatePropertySet].leftChild;
        },
        set(v) {
          this[privatePropertySet].leftChild = v;
          if (v) {
            v[privatePropertySet].parent = this;
          }
        },
        enumerable: true
      },
      rightChild: {
        get() {
          return this[privatePropertySet].rightChild;
        },
        set(v) {
          this[privatePropertySet].rightChild = v;
          if (v) {
            v[privatePropertySet].parent = this;
          }
        },
        enumerable: true
      },
      npl: {
        get() {
          return this[privatePropertySet].npl;
        },
        enumerable: true
      }
    });

    if (leftChild) {
      this.leftChild = leftChild;
    }
    if (rightChild) {
      this.rightChild = rightChild;
    }
  }

  get leftChildNpl() {
    if (this.leftChild) {
      return this.leftChild.npl;
    }
    else {
      return -1;
    }
  }
  get rightChildNpl() {
    if (this.rightChild) {
      return this.rightChild.npl;
    }
    else {
      return -1;
    }
  }

  /**
   * 合并两个左式堆的操作，返回新的左式堆的根节点
   */
  merge(leftHeapNode) {
    let hostNode = null, targetNode = null;
    if (this.value < leftHeapNode.value) {
      hostNode = this;
      targetNode = leftHeapNode;
    }
    else if (this.value > leftHeapNode.value) {
      hostNode = leftHeapNode;
      targetNode = this;
    }
    else {
      throw new Error('There are the same nodes, merge failed!');
    }
    if (hostNode.rightChild) {
      hostNode.rightChild = hostNode.rightChild.merge(targetNode);
    }
    else {
      hostNode.rightChild = targetNode;
    }
    hostNode.swapLeftRight();
    hostNode[privatePropertySet].npl = Math.min(hostNode.leftChildNpl, hostNode.rightChildNpl) + 1;
    return hostNode;
  }
  swapLeftRight() {
    if (this.leftChildNpl < this.rightChildNpl) {
      ([ this.leftChild, this.rightChild ] = [ this.rightChild, this.leftChild ]);
    }
  }
}
