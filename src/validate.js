import { EnumColor } from './redBlackTreeNode';

export function validateBinarySearchTree(tree) {
  //校验所有的左子节点小于父节点小于右子节点
  let currentMaxValue = -Infinity;
  let values = [];
  loopNode(tree.tree);
  console.log(values);

  function loopNode(node) {
    if (node.leftChild) {
      loopNode(node.leftChild);
    }
    values.push(node.value);
    if (node.value > currentMaxValue) {
      currentMaxValue = node.value;
    }
    else {
      throw new Error('二叉查找树的大小顺序不正确');
    }
    if (node.rightChild) {
      loopNode(node.rightChild);
    }
  }
}

export function validateRedBlackTree(tree) {
  validateBinarySearchTree(tree);
  let rootNode = tree.tree;
  //校验红黑树的根节点是否黑色
  if (rootNode.color !== EnumColor.black) {
    throw new Error('红黑树根结点不是黑色');
  }
  //校验红节点不能连续两个
  //校验每个节点到该节点的子孙节点的所有路径上包含相同数目的黑节点
}
