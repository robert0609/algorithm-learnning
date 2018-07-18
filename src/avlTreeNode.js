import { BinarySearchTreeNode } from './binarySearchTreeNode';

const privatePropertySet = Symbol('privatePropertySet');

function parameterCanNotBeNull(name) {
  throw new Error(`${name} can not be null!`);
}

export class AVLTreeNode extends BinarySearchTreeNode {
  constructor(value = parameterCanNotBeNull(), {
    leftChild = null,
    rightChild = null
  } = {}) {
    super(value, {
      leftChild,
      rightChild
    });

    this[privatePropertySet] = {
      height: Math.max((leftChild ? leftChild.height : -1), (rightChild ? rightChild.height : -1)) + 1
    };

    Object.defineProperties(this, {
      height: {
        get() {
          return this[privatePropertySet].height;
        },
        enumerable: true
      }
    });
  }

  get leftChildHeight() {
    if (this.leftChild) {
      return this.leftChild[privatePropertySet].height;
    }
    else {
      return -1;
    }
  }
  get rightChildHeight() {
    if (this.rightChild) {
      return this.rightChild[privatePropertySet].height;
    }
    else {
      return -1;
    }
  }

  insert(value) {
    let { insertResult, trulyInsert } = super.insert(value);
    if (trulyInsert) {
      let privateSet = this[privatePropertySet];
      privateSet.height = Math.max(this.leftChildHeight, this.rightChildHeight) + 1;
      // console.log(`inserted value[${value}], value[${this.value}] node reset height. new height: ${privateSet.height}`);
      //如果不平衡了，需要修正
      this.balance();
    }
    return { insertResult, trulyInsert };
  }
  delete(value) {
    let { deleteResult, trulyDelete } = super.delete(value);
    if (trulyDelete) {
      let privateSet = this[privatePropertySet];
      privateSet.height = Math.max(this.leftChildHeight, this.rightChildHeight) + 1;
      // console.log(`deleted value[${value}], value[${this.value}] node reset height. new height: ${privateSet.height}`);
      //如果不平衡了，需要修正
      this.balance();
    }
    return { deleteResult, trulyDelete };
  }
  balance() {
    if (this.leftChildHeight - this.rightChildHeight > 1) {
      // console.log(`value[${this.value}] node fix balance`);
      if (this.leftChild.leftChildHeight > this.leftChild.rightChildHeight) {
        this.clockwiseRotate();
      }
      else if (this.leftChild.leftChildHeight < this.leftChild.rightChildHeight) {
        this.leftChild.anticlockwiseRotate();
        this.clockwiseRotate();
      }
    }
    else if (this.rightChildHeight - this.leftChildHeight > 1) {
      // console.log(`value[${this.value}] node fix balance`);
      if (this.rightChild.rightChildHeight > this.rightChild.leftChildHeight) {
        this.anticlockwiseRotate();
      }
      else if (this.rightChild.rightChildHeight < this.rightChild.leftChildHeight) {
        this.rightChild.clockwiseRotate();
        this.anticlockwiseRotate();
      }
    }
  }
  clockwiseRotate() {
    super.clockwiseRotate();
    if (this.rightChild) {
      this.rightChild[privatePropertySet].height = Math.max(this.rightChild.leftChildHeight, this.rightChild.rightChildHeight) + 1;
    }
    this[privatePropertySet].height = Math.max(this.leftChildHeight, this.rightChildHeight) + 1;
  }
  anticlockwiseRotate() {
    super.anticlockwiseRotate();
    if (this.leftChild) {
      this.leftChild[privatePropertySet].height = Math.max(this.leftChild.leftChildHeight, this.leftChild.rightChildHeight) + 1;
    }
    this[privatePropertySet].height = Math.max(this.leftChildHeight, this.rightChildHeight) + 1;
  }
}

