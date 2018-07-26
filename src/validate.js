import { EnumColor } from './redBlackTreeNode';

export function validateBinarySearchTree(tree) {
  //校验所有的左子节点小于父节点小于右子节点
  let currentMaxValue = -Infinity;
  let values = [];
  loopNode(tree.tree);
  console.log(`中序遍历：[${values}]; 二叉查找树性质校验成功`);
  function loopNode(node) {
    if (node.leftChild) {
      if (node.leftChild.parent.value !== node.value) {
        throw new Error(`节点${node.value}的左子节点${node.leftChild.value}的父节点引用不对`);
      }
      loopNode(node.leftChild);
    }
    values.push(node.value);
    if (node.value > currentMaxValue) {
      currentMaxValue = node.value;
    }
    else {
      throw new Error(`节点${node.value}处不符合二叉查找树的大小顺序`);
    }
    if (node.rightChild) {
      if (node.rightChild.parent.value !== node.value) {
        throw new Error(`节点${node.value}的右子节点${node.rightChild.value}的父节点引用不对`);
      }
      loopNode(node.rightChild);
    }
  }
}

export function validateAVLTree(tree) {
  validateBinarySearchTree(tree);
  let rootNode = tree.tree;
  //校验每个节点左右子树的高度差不大于1
  let values = [];
  loopNode(rootNode);
  console.log(`后序遍历：[${values}]; AVL树性质校验成功`);

  function loopNode(node) {
    if (node.leftChild) {
      loopNode(node.leftChild);
    }
    if (node.rightChild) {
      loopNode(node.rightChild);
    }
    values.push(node.value);
    if (Math.abs(node.leftChildHeight - node.rightChildHeight) > 1) {
      throw new Error(`节点${node.value}的左子树的高度${node.leftChildHeight}与右子树的高度${node.rightChildHeight}差值大于1`);
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
  let values = [];
  loopNode(rootNode);
  console.log(`后序遍历：[${values}]; 红黑树性质校验成功`);

  function loopNode(node) {
    if (node.leftChild) {
      loopNode(node.leftChild);
    }
    if (node.rightChild) {
      loopNode(node.rightChild);
    }
    values.push(node.value);
    if (node.color === EnumColor.red) {
      if (node.leftChild && node.leftChild.color === EnumColor.red) {
        throw new Error(`父节点${node.value}与左子节点${node.leftChild.value}连续红色`);
      }
      if (node.rightChild && node.rightChild.color === EnumColor.red) {
        throw new Error(`父节点${node.value}与右子节点${node.rightChild.value}连续红色`);
      }
    }
    if (node.leftChildBlackHeight !== node.rightChildBlackHeight) {
      throw new Error(`节点${node.value}的左子树的黑高度${node.leftChildBlackHeight}与右子树的黑高度${node.rightChildBlackHeight}不一致`);
    }
  }
}
