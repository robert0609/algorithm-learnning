/**
 * 零路径长(null path length)定义：任一节点到一个没有两个儿子的节点的最短路径的长
 * 左式堆性质：堆中每一个节点，左儿子的npl不小于右儿子的npl
 */
const privatePropertySet = Symbol('privatePropertySet');

function parameterCanNotBeNull(name) {
  throw new Error(`${name} can not be null!`);
}

export class LeftHeapNode {
  constructor(value = parameterCanNotBeNull(), {
    leftChild = null,
    rightChild = null
  } = {}) {}
}
