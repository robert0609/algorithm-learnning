import { BinarySearchTreeNode } from './binarySearchTreeNode';

const privatePropertySet = Symbol('privatePropertySet');

export class BinarySearchTree {
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
          this[privatePropertySet].tree = new BinarySearchTreeNode(valueList[i]);
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
  let binaryTree = new BinarySearchTree([5,2,1,4,3,9,8,6,7]);
  let jsonTree = JSON.stringify(binaryTree.tree);
  console.log(jsonTree);
  console.log(`max: ${binaryTree.max}`);
  console.log(`min: ${binaryTree.min}`);
  console.log(`find 2: ${binaryTree.find(2)}`);
  console.log(`find 12: ${binaryTree.find(12)}`);
  console.log(`find 6: ${binaryTree.find(6)}`);

  binaryTree.delete(6);
  binaryTree.delete(7);
  binaryTree.delete(1);
  binaryTree.delete(4);
  binaryTree.delete(3);
  binaryTree.delete(5);
  binaryTree.delete(2);
  binaryTree.delete(8);
  binaryTree.delete(9);
  binaryTree.insert(7);
  binaryTree.insert(6);
  binaryTree.insert(5);
  binaryTree.insert(12);
  binaryTree.insert(2);
  console.log(JSON.stringify(binaryTree.tree));

  console.log(`max: ${binaryTree.max}`);
  console.log(`min: ${binaryTree.min}`);
  console.log(`find 2: ${binaryTree.find(2)}`);
  console.log(`find 12: ${binaryTree.find(12)}`);
  console.log(`find 6: ${binaryTree.find(6)}`);
}
