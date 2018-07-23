/**
 * 红黑树的特性:
 * （1）每个节点或者是黑色，或者是红色。
 * （2）根节点是黑色。
 * （3）每个叶子节点（NIL）是黑色。 [注意：这里叶子节点，是指为空(NIL或NULL)的叶子节点！]
 * （4）如果一个节点是红色的，则它的子节点必须是黑色的。
 * （5）从一个节点到该节点的子孙节点的所有路径上包含相同数目的黑节点。
 * 注意：
 *  (01) 特性(3)中的叶子节点，是只为空(NIL或null)的节点。
 *  (02) 特性(5)，确保没有一条路径会比其他路径长出俩倍。因而，红黑树是相对是接近平衡的二叉树。
 */
import { BinarySearchTreeNode } from './binarySearchTreeNode';

const privatePropertySet = Symbol('privatePropertySet');
const checkBlackHeight = Symbol('checkBlackHeight');
const computeBlackHeight = Symbol('computeBlackHeight');

const EnumColor = {
  red: 1,
  black: 2
};

function parameterCanNotBeNull(name) {
  throw new Error(`${name} can not be null!`);
}

export class RedBlackTreeNode extends BinarySearchTreeNode {
  constructor(value = parameterCanNotBeNull(), {
    leftChild = null,
    rightChild = null
  } = {}) {
    super(value, {
      leftChild,
      rightChild
    });

    this[privatePropertySet] = {
      color: EnumColor.black
    };

    Object.defineProperties(this, {
      color: {
        get() {
          return this[privatePropertySet].color;
        },
        set(v) {
          this[privatePropertySet].color = v;
        },
        enumerable: true
      },
      blackHeight: {
        get() {
          if (this[privatePropertySet].color === EnumColor.black) {
            return this[computeBlackHeight]() + 1;
          }
          else {
            return this[computeBlackHeight]();
          }
        },
        enumerable: true
      }
    });
  }

  get leftChildBlackHeight() {
    if (this.leftChild) {
      return this.leftChild.blackHeight;
    }
    else {
      return 0;
    }
  }
  get rightChildBlackHeight() {
    if (this.rightChild) {
      return this.rightChild.blackHeight;
    }
    else {
      return 0;
    }
  }

  [checkBlackHeight]() {
    return this.leftChildBlackHeight === this.rightChildBlackHeight;
  }

  [computeBlackHeight]() {
    return Math.max(this.leftChildBlackHeight, this.rightChildBlackHeight);
  }

  insert(value) {
    let { insertResult, trulyInsert } = super.insert(value);
    if (trulyInsert) {
      if (!this[checkBlackHeight]()) {
        let insertedNode = this.find(value);
        //黑节点的高度发生了变化
        if (this.color === EnumColor.black) {
          insertedNode.color = EnumColor.red;
        }
        else {
          this.parent.balance();
        }
      }
    }
    return { insertResult, trulyInsert };
  }
  delete(value) {}
  balance() {
    if (this.leftChildBlackHeight > this.rightChildBlackHeight) {
      if (this.leftChild.leftChildBlackHeight > this.leftChild.rightChildBlackHeight) {}
      else if (this.leftChild.leftChildBlackHeight < this.leftChild.rightChildBlackHeight) {}
    }
    else if (this.leftChildBlackHeight < this.rightChildBlackHeight) {
      if (this.rightChild.leftChildBlackHeight > this.rightChild.rightChildBlackHeight) {}
      else if (this.rightChild.leftChildBlackHeight < this.rightChild.rightChildBlackHeight) {
        if (this.rightChild.color === EnumColor.black) {
          this.rightChild.rightChild.color = EnumColor.red;
        }
        else {
          if (this.leftChild) {
            //TODO:
          }
        }
      }
    }
  }
  clockwiseRotate() {
    super.clockwiseRotate();
    // if (this.rightChild) {
    //   this.rightChild[privatePropertySet].height = Math.max(this.rightChild.leftChildHeight, this.rightChild.rightChildHeight) + 1;
    // }
    // this[privatePropertySet].height = Math.max(this.leftChildHeight, this.rightChildHeight) + 1;
  }
  anticlockwiseRotate() {
    super.anticlockwiseRotate();
    // if (this.leftChild) {
    //   this.leftChild[privatePropertySet].height = Math.max(this.leftChild.leftChildHeight, this.leftChild.rightChildHeight) + 1;
    // }
    // this[privatePropertySet].height = Math.max(this.leftChildHeight, this.rightChildHeight) + 1;
  }
}
