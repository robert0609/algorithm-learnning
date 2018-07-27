import { LeftHeapNode } from './leftHeapNode';
import { validateLeftHeap } from './validate';

const privatePropertySet = Symbol('privatePropertySet');

export class LeftHeap {
  constructor() {
    this[privatePropertySet] = {
      root: null
    };

    Object.defineProperty(this, 'root', {
      get() {
        return this[privatePropertySet].root;
      },
      enumerable: true
    });
  }

  push(...values) {
    values.forEach(value => {
      let node = new LeftHeapNode(value);
      console.log(`插入${value}`);
      if (this[privatePropertySet].root) {
        this[privatePropertySet].root = this[privatePropertySet].root.merge(node);
      }
      else {
        this[privatePropertySet].root = node;
      }
      validateLeftHeap(this);
    });
  }
  findMin() {
    let node = this[privatePropertySet].root;
    console.log(`最小值${node.value}`);
    return node.value;
  }
  popMin() {
    let minRoot = this[privatePropertySet].root;
    let leftChild = minRoot.leftChild;
    let rightChild = minRoot.rightChild;
    minRoot.leftChild = null;
    minRoot.rightChild = null;
    this[privatePropertySet].root = leftChild.merge(rightChild);
    console.log(`弹出最小值${minRoot.value}`);
    validateLeftHeap(this);
    return minRoot.value;
  }
}

export function run() {
  let heap = new LeftHeap();
  heap.push([5,1,65,4,9,8,17]);
  heap.findMin();
  heap.popMin();
  heap.findMin();
  heap.popMin();
  heap.findMin();
  heap.popMin();
  heap.push([4,10,5,1,36]);
  heap.findMin();
  heap.popMin();
  heap.findMin();
  heap.popMin();
}
