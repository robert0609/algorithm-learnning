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

  insert(...values) {
    values.forEach(value => {
      let result = this[privatePropertySet].tree.insert(value);
      console.log(`插入${value}`);
      validateRedBlackTree(this);
      return result;
    });
  }

  delete(...values) {
    values.forEach(value => {
      let result = this[privatePropertySet].tree.delete(value);
      console.log(`移除${value}`);
      validateRedBlackTree(this);
      return result;
    });
  }
}

export function run() {
  let rbTree = new RedBlackTree([10,5,18,1,9,14,20,3,7,12,16]);
  rbTree.insert(2);
  rbTree.insert(4);
  rbTree.insert(6);
  rbTree.insert(8);
  rbTree.insert(11);
  rbTree.insert(13);
  rbTree.insert(15);
  rbTree.insert(17);
  rbTree.insert(19);
  rbTree.insert(26,37,24,69,145);

  rbTree.delete(3);
  rbTree.delete(4);
  rbTree.delete(1);
  rbTree.delete(2);
  rbTree.delete(8);
  rbTree.delete(6);
  rbTree.delete(7);
  rbTree.delete(9);
  rbTree.delete(20);

  rbTree.insert(2,6,8,7);

  rbTree.delete(19);
  rbTree.delete(15);
  rbTree.delete(11);
  rbTree.delete(13);
  rbTree.delete(17);
  rbTree.delete(16);
  rbTree.delete(5);
  rbTree.delete(12);
  rbTree.delete(18);
  rbTree.delete(14);
  rbTree.delete(10);

  rbTree.delete(69,145);
  console.log(JSON.stringify(rbTree.tree));
}
