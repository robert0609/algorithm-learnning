import { AVLTreeNode } from './avlTreeNode';
import { validateAVLTree } from './validate';

const privatePropertySet = Symbol('privatePropertySet');

export class AVLTree {
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
          this[privatePropertySet].tree = new AVLTreeNode(valueList[i]);
          validateAVLTree(this);
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
      validateAVLTree(this);
      return result;
    });
  }

  delete(...values) {
    values.forEach(value => {
      let result = this[privatePropertySet].tree.delete(value);
      console.log(`移除${value}`);
      validateAVLTree(this);
      return result;
    });
  }
}

export function run() {
  let avl = new AVLTree([7,3,10,2,5,8,13,1,4,9,11,14,12,6]);
  console.log(`max: ${avl.max}`);
  console.log(`min: ${avl.min}`);
  console.log(`find 2: ${avl.find(2)}`);
  console.log(`find 12: ${avl.find(12)}`);
  console.log(`find 6: ${avl.find(6)}`);
  avl.delete(1, 2);
  avl.delete(8);
  avl.delete(6);
  avl.delete(7);
  avl.delete(4);
  avl.delete(3);
  avl.delete(5);
  avl.insert(7);
  avl.insert(5);
  avl.delete(9);
  avl.delete(12);
  avl.insert(6);
  avl.insert(12);
  avl.insert(2);
  avl.insert(20);

  console.log(`max: ${avl.max}`);
  console.log(`min: ${avl.min}`);
  console.log(`find 2: ${avl.find(2)}`);
  console.log(`find 12: ${avl.find(12)}`);
  console.log(`find 6: ${avl.find(6)}`);
  console.log(JSON.stringify(avl.tree));
}
