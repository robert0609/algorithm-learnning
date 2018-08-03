import { BinaryTreeNode } from './binaryTreeNode';

const privatePropertySet = Symbol('privatePropertySet');
const pushSingle = Symbol('pushSingle');
const switchUp = Symbol('switchUp');
const switchDown = Symbol('switchDown');
const _compare = Symbol('compare');

export class BinaryFullTree {
  constructor(compare = (a, b) => a - b) {
    this[privatePropertySet] = {
      buffer: [null]
    };
    this[_compare] = compare;
  }

  [pushSingle](value) {
    let buffer = this[privatePropertySet].buffer;
    buffer.push(value);
    this[switchUp](buffer.length - 1);
  }
  [switchUp](childIndex) {
    let parentIndex = Math.floor(childIndex / 2);
    if (parentIndex > 0) {
      let buffer = this[privatePropertySet].buffer;
      //上行交换
      if (this[_compare](buffer[childIndex], buffer[parentIndex]) < 0) {
        [ buffer[parentIndex], buffer[childIndex] ] = [ buffer[childIndex], buffer[parentIndex] ];
        this[switchUp](parentIndex);
      }
    }
  }
  [switchDown](parentIndex) {
    if (parentIndex === 0) {
      return;
    }
    let buffer = this[privatePropertySet].buffer;
    let leftChildIndex = parentIndex * 2;
    if (leftChildIndex < buffer.length) {
      let rightChildIndex = parentIndex * 2 + 1;
      let smallerIndex = leftChildIndex;
      if (rightChildIndex < buffer.length) {
        if (this[_compare](buffer[rightChildIndex], buffer[leftChildIndex]) < 0) {
          smallerIndex = rightChildIndex;
        }
      }
      //下行交换
      if (this[_compare](buffer[parentIndex], buffer[smallerIndex]) > 0) {
        [ buffer[parentIndex], buffer[smallerIndex] ] = [ buffer[smallerIndex], buffer[parentIndex] ];
        this[switchDown](smallerIndex);
      }
    }
    else {
      return;
    }
  }

  push(...values) {
    let buffer = this[privatePropertySet].buffer;
    for (let value of values) {
      this[pushSingle](value);
    }
  }
  findMin() {
    let buffer = this[privatePropertySet].buffer;
    return buffer.length > 1 ? buffer[1] : null;
  }
  popMin() {
    let buffer = this[privatePropertySet].buffer;
    if (buffer.length > 1) {
      let min = buffer[1];
      if (buffer.length > 2) {
        buffer[1] = buffer[buffer.length - 1];
        buffer.splice(buffer.length - 1);
        this[switchDown](1);
      }
      else {
        buffer.splice(buffer.length - 1);
      }
      return min;
    }
    else {
      return null;
    }
  }

  display() {
    let buffer = this[privatePropertySet].buffer;
    if (buffer.length === 1) {
      return null;
    }
    let nodes = buffer.map(elem => {
      if (elem) {
        return new BinaryTreeNode(elem);
      }
      else {
        return null;
      }
    });
    for (let i = 1; i < nodes.length; ++i) {
      let parentNode = nodes[i];
      if (i * 2 < nodes.length) {
        parentNode.leftChild = nodes[i * 2];
      }
      else {
        break;
      }
      if (i * 2 + 1 < nodes.length) {
        parentNode.rightChild = nodes[i * 2 + 1];
      }
      else {
        break;
      }
    }
    return nodes[1];
  }
}

export function run() {
  let fullTree = new BinaryFullTree();
  fullTree.push(5,2,1,4,3,9,8,6,7);
  console.log(JSON.stringify(fullTree.display()));
  console.log(`min value: ${fullTree.findMin()}`);

  console.log(`pop min value: ${fullTree.popMin()}`);
  console.log(JSON.stringify(fullTree.display()));
  console.log(`pop min value: ${fullTree.popMin()}`);
  console.log(JSON.stringify(fullTree.display()));
  console.log(`pop min value: ${fullTree.popMin()}`);
  console.log(JSON.stringify(fullTree.display()));
  console.log(`pop min value: ${fullTree.popMin()}`);
  console.log(JSON.stringify(fullTree.display()));
  console.log(`pop min value: ${fullTree.popMin()}`);
  console.log(JSON.stringify(fullTree.display()));
  console.log(`pop min value: ${fullTree.popMin()}`);
  console.log(JSON.stringify(fullTree.display()));
  console.log(`pop min value: ${fullTree.popMin()}`);
  console.log(JSON.stringify(fullTree.display()));
  console.log(`pop min value: ${fullTree.popMin()}`);
  console.log(JSON.stringify(fullTree.display()));
  console.log(`pop min value: ${fullTree.popMin()}`);
  console.log(JSON.stringify(fullTree.display()));
}
