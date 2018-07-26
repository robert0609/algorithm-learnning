import { SplayTreeNode } from './splayTreeNode';
import { validateSplayTree } from './validate';

const privatePropertySet = Symbol('privatePropertySet');

export class SplayTree {
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
          this[privatePropertySet].tree = new SplayTreeNode(valueList[i]);
          validateSplayTree(this, valueList[i]);
        }
      }
    }

  }

  get max() {
    let e = this[privatePropertySet].tree.findMax();
    validateSplayTree(this, e.value);
    return e ? e.value : null;
  }
  get min() {
    let e = this[privatePropertySet].tree.findMin();
    validateSplayTree(this, e.value);
    return e ? e.value : null;
  }

  find(value) {
    let e = this[privatePropertySet].tree.find(value);
    validateSplayTree(this, value);
    return e ? e.value : null;
  }

  insert(...values) {
    values.forEach(value => {
      let result = this[privatePropertySet].tree.insert(value);
      console.log(`插入${value}`);
      validateSplayTree(this, value);
      return result;
    });
  }

  delete(...values) {
    values.forEach(value => {
      let result = this[privatePropertySet].tree.delete(value);
      console.log(`移除${value}`);
      validateSplayTree(this, value);
      return result;
    });
  }
}

export function run() {
  let splayTree = new SplayTree([7,3,10,2,5,8,13,1,4,9,11,14,12,6]);
  console.log(`max: ${splayTree.max}`);
  console.log(`min: ${splayTree.min}`);
  console.log(`find 2: ${splayTree.find(2)}`);
  console.log(`find 12: ${splayTree.find(12)}`);
  console.log(`find 6: ${splayTree.find(6)}`);
  splayTree.delete(1, 2);
  splayTree.delete(8);
  splayTree.delete(6);
  splayTree.delete(7);
  splayTree.delete(4);
  splayTree.delete(3);
  splayTree.delete(5);
  splayTree.insert(7);
  splayTree.insert(5);
  splayTree.delete(9);
  splayTree.delete(12);
  splayTree.insert(6);
  splayTree.insert(12);
  splayTree.insert(2);
  splayTree.insert(20);

  console.log(`max: ${splayTree.max}`);
  console.log(`min: ${splayTree.min}`);
  console.log(`find 2: ${splayTree.find(2)}`);
  console.log(`find 12: ${splayTree.find(12)}`);
  console.log(`find 6: ${splayTree.find(6)}`);
  console.log(JSON.stringify(splayTree.tree));
}
