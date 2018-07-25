import { RedBlackTreeNode } from './redBlackTreeNode';

const privatePropertySet = Symbol('privatePropertySet');

export class RedBlackTree {
  constructor(valueList = []) {
    this[privatePropertySet] = {
      tree: null
    };
    if (valueList.length > 0) {
      for (let i = 0; i < valueList.length; ++i) {
        if (this[privatePropertySet].tree) {
          this[privatePropertySet].tree.insert(valueList[i]);
        }
        else {
          this[privatePropertySet].tree = new RedBlackTreeNode(valueList[i]);
        }
      }
    }

    Object.defineProperty(this, 'tree', {
      get() {
        return this[privatePropertySet].tree;
      },
      enumerable: true
    });
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
    return this[privatePropertySet].tree.insert(value);
  }

  delete(value) {
    return this[privatePropertySet].tree.delete(value);
  }
}

export function run() {
  let rbTree = new RedBlackTree([5,2,1,4,3,9,8,6,7]);
  console.log(JSON.stringify(rbTree.tree));
}
