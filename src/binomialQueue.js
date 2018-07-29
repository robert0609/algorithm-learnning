import { BinomialQueueNode } from './binomialQueueNode';
import { validateBinomialQueue } from './validate';

const privatePropertySet = Symbol('privatePropertySet');

export class BinomialQueue {
  constructor() {
    this[privatePropertySet] = {
      forest: []
    };

    Object.defineProperties(this, {
      forest: {
        get() {
          return this[privatePropertySet].forest;
        },
        enumerable: true
      }
    });
  }

  merge(o) {
    let forest = [];
    if (o.index > -1) {
      forest.push(o);
    }
    else {
      forest = o.forest;
    }
    for (let i = 0; i < forest.length; ++i) {
      let j = i;
      let mergedNode = forest[j];
      while (this.forest[j]) {
        mergedNode = this.forest[j].merge(mergedNode);
        this.forest[j] = undefined;
        ++j;
      }
      this.forest[j] = mergedNode;
    }
  }

  push(...values) {
    values.forEach(value => {
      this.merge(new BinomialQueueNode(value));
    });
    validateBinomialQueue(this);
  }
  findMin() {
    let result = null;
    this.forest.forEach(node => {
      if (!node) {
        return;
      }
      if (result) {
        if (node.value < result.value) {
          result = node;
        }
      }
      else {
        result = node;
      }
    });
    console.log(`最小值${result.value}`);
    return result.value;
  }
  popMin() {
    let min = null;
    this.forest.forEach(node => {
      if (!node) {
        return;
      }
      if (min) {
        if (node.value < min.value) {
          min = node;
        }
      }
      else {
        min = node;
      }
    });
    console.log(`弹出最小值${min.value}`);
    this.forest[min.index] = undefined;
    min.forest.forEach(node => {
      this.merge(node);
    });
    validateBinomialQueue(this);
  }
}

export function run() {
  let heap = new BinomialQueue();
  heap.push(5,1,65,4,9,8,17);
  heap.findMin();
  heap.popMin();
  heap.findMin();
  heap.popMin();
  // heap.findMin();
  // heap.popMin();
  // heap.push(4,10,5,1,36);
  // heap.findMin();
  // heap.popMin();
  // heap.findMin();
  // heap.popMin();
}
