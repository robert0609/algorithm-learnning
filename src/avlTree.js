import { AVLTreeNode } from './avlTreeNode';

const privatePropertySet = Symbol('privatePropertySet');

export class AVLTree {
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
          this[privatePropertySet].tree = new AVLTreeNode(valueList[i]);
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
  // let avl = new AVLTree([5,2,1,4,3,9,8,6,7]);
  // let jsonTree = JSON.stringify(avl.tree);
  // console.log(jsonTree);
  // console.log(`max: ${avl.max}`);
  // console.log(`min: ${avl.min}`);
  // console.log(`find 2: ${avl.find(2)}`);
  // console.log(`find 12: ${avl.find(12)}`);
  // console.log(`find 6: ${avl.find(6)}`);

  // avl.delete(8);
  // avl.delete(6);
  // avl.delete(7);
  // avl.delete(1);
  // avl.delete(4);
  // avl.delete(3);
  // avl.delete(5);
  // avl.insert(7);
  // avl.insert(5);
  // // avl.delete(2);
  // // avl.delete(9);
  // // avl.delete(12);
  // // avl.insert(6);
  // // avl.insert(12);
  // // avl.insert(2);
  // // avl.insert(20);
  // console.log(JSON.stringify(avl.tree));

  // console.log(`max: ${avl.max}`);
  // console.log(`min: ${avl.min}`);
  // console.log(`find 2: ${avl.find(2)}`);
  // console.log(`find 12: ${avl.find(12)}`);
  // console.log(`find 6: ${avl.find(6)}`);


  let avl = new AVLTree([4,1,6,2,5,7]);
  let jsonTree = JSON.stringify(avl.tree);
  console.log(jsonTree);

  avl.insert(3);
  console.log(JSON.stringify(avl.tree));
}
