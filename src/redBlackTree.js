import { RedBlackTreeNode } from './redBlackTreeNode';
import { validateRedBlackTree } from './validate';

const privatePropertySet = Symbol('privatePropertySet');

export class RedBlackTree {
  constructor(valueList = []) {
    this[privatePropertySet] = {
      tree: null
    };

    Object.defineProperty(this, 'tree', {
      get() {
        return this[privatePropertySet].tree;
      },
      enumerable: true
    });

    if (valueList.length > 0) {
      for (let i = 0; i < valueList.length; ++i) {
        if (this.tree) {
          this.insert(valueList[i]);
        }
        else {
          this[privatePropertySet].tree = new RedBlackTreeNode(valueList[i]);
          validateRedBlackTree(this);
        }
      }
    }

  }

  get max() {
    let e = this[privatePropertySet].tree.findMax();
    return e ? e.value : null;
  }
  get min() {
    let e = this[privatePropertySet].tree.findMin();
    return e ? e.value : null;
  }

  find(value) {
    let e = this[privatePropertySet].tree.find(value);
    return e ? e.value : null;
  }

  insert(value) {
    let result = this[privatePropertySet].tree.insert(value);
    console.log(`插入${value}`);
    validateRedBlackTree(this);
    return result;
  }

  delete(value) {
    let result = this[privatePropertySet].tree.delete(value);
    console.log(`移除${value}`);
    validateRedBlackTree(this);
    return result;
  }
}

export function run() {
  let rbTree = new RedBlackTree([5,2,1,4,3,9,8,6,7]);
  rbTree.insert(10);
  rbTree.insert(13);
  rbTree.insert(11);
  rbTree.insert(12);
  rbTree.insert(20);
  rbTree.insert(16);
  rbTree.delete(6);
  rbTree.delete(8);
  rbTree.delete(4);
  rbTree.delete(1);
  rbTree.delete(7);
  rbTree.insert(4);
  rbTree.delete(5);
  rbTree.delete(2);
  console.log(JSON.stringify(rbTree.tree));
}
