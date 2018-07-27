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
  let heightDic = {};
  let rootNode = tree.tree;
  //校验每个节点左右子树的高度差不大于1
  let values = [];
  loopNode(rootNode);
  console.log(`后序遍历：[${values}]; AVL树性质校验成功`);

  function computeHeight(node) {
    let h = null;
    if (heightDic[node.value]) {
      h = heightDic[node.value];
    }
    else {
      if (node.leftChild && node.rightChild) {
        h = Math.max(computeHeight(node.leftChild), computeHeight(node.rightChild)) + 1;
      }
      else if (node.leftChild) {
        h = computeHeight(node.leftChild) + 1;
      }
      else if (node.rightChild) {
        h = computeHeight(node.rightChild) + 1;
      }
      else {
        h = 0;
      }
      heightDic[node.value] = h;
    }
    return h;
  }

  function loopNode(node) {
    let leftChildHeight = -1;
    if (node.leftChild) {
      leftChildHeight = computeHeight(node.leftChild);
      if (leftChildHeight !== node.leftChildHeight) {
        throw new Error(`节点${node.leftChild.value}的高度${node.leftChildHeight}计算不对`);
      }
      loopNode(node.leftChild);
    }
    let rightChildHeight = -1;
    if (node.rightChild) {
      rightChildHeight = computeHeight(node.rightChild);
      if (rightChildHeight !== node.rightChildHeight) {
        throw new Error(`节点${node.rightChild.value}的高度${node.rightChildHeight}计算不对`);
      }
      loopNode(node.rightChild);
    }
    values.push(node.value);
    if (Math.abs(leftChildHeight - rightChildHeight) > 1) {
      throw new Error(`节点${node.value}的左子树的高度${leftChildHeight}与右子树的高度${rightChildHeight}差值大于1`);
    }
  }
}

export function validateRedBlackTree(tree) {
  validateBinarySearchTree(tree);
  let blackHeightDic = {};
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

  function computeBlackHeight(node) {
    let h = null;
    if (blackHeightDic[node.value]) {
      h = blackHeightDic[node.value];
    }
    else {
      if (node.leftChild && node.rightChild) {
        let lbh = computeBlackHeight(node.leftChild);
        let rbh = computeBlackHeight(node.rightChild);
        if (lbh !== rbh) {
          throw new Error(`节点${node.value}的左子树的黑高度${node.lbh}与右子树的黑高度${node.rbh}不一致`);
        }
        if (node.color === EnumColor.black) {
          h = lbh + 1;
        }
        else {
          h = lbh;
        }
      }
      else if (node.leftChild) {
        let lbh = computeBlackHeight(node.leftChild);
        if (lbh > 0) {
          throw new Error(`节点${node.value}没有右子树，但左子树黑高度${lbh}计算的不对`);
        }
        if (node.color === EnumColor.black) {
          h = lbh + 1;
        }
        else {
          h = lbh;
        }
      }
      else if (node.rightChild) {
        let rbh = computeBlackHeight(node.rightChild);
        if (rbh > 0) {
          throw new Error(`节点${node.value}没有左子树，但右子树黑高度${rbh}计算的不对`);
        }
        if (node.color === EnumColor.black) {
          h = rbh + 1;
        }
        else {
          h = rbh;
        }
      }
      else {
        if (node.color === EnumColor.black) {
          h = 1;
        }
        else {
          h = 0;
        }
      }
      blackHeightDic[node.value] = h;
    }
    return h;
  }

  function loopNode(node) {
    let leftChildBlackHeight = 0;
    if (node.leftChild) {
      leftChildBlackHeight = computeBlackHeight(node.leftChild);
      if (leftChildBlackHeight !== node.leftChildBlackHeight) {
        throw new Error(`节点${node.leftChild.value}的黑高度${node.leftChildBlackHeight}计算不对`);
      }
      loopNode(node.leftChild);
    }
    let rightChildBlackHeight = 0;
    if (node.rightChild) {
      rightChildBlackHeight = computeBlackHeight(node.rightChild);
      if (rightChildBlackHeight !== node.rightChildBlackHeight) {
        throw new Error(`节点${node.rightChild.value}的黑高度${node.rightChildBlackHeight}计算不对`);
      }
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
    if (leftChildBlackHeight !== rightChildBlackHeight) {
      throw new Error(`节点${node.value}的左子树的黑高度${leftChildBlackHeight}与右子树的黑高度${rightChildBlackHeight}不一致`);
    }
  }
}

export function validateSplayTree(tree, operationValue = null) {
  validateBinarySearchTree(tree);
  let rootNode = tree.tree;
  //校验操作的节点值已经被伸展到根节点
  if (operationValue && rootNode.value !== operationValue) {
    throw new Error(`访问的节点${operationValue}没有伸展到根部`);
  }
  let values = [];
  loopNode(rootNode);
  console.log(`后序遍历：[${values}]; 伸展树性质校验成功`);

  function loopNode(node) {
    if (node.leftChild) {
      loopNode(node.leftChild);
    }
    if (node.rightChild) {
      loopNode(node.rightChild);
    }
    values.push(node.value);
  }
}

export function validateLeftHeap(leftHeap) {
  let nplDic = {};
  let root = leftHeap.root;
  let values = [];
  //校验优先队列的堆序性质
  //校验左式堆性质：堆中每一个节点，左儿子的npl不小于右儿子的npl
  loopNode(root);
  console.log(`中序遍历：[${values}]; 左式堆性质校验成功`);

  function computeNPL(node) {
    let npl = null;
    if (nplDic[node.value]) {
      npl = nplDic[node.value];
    }
    else {
      if (node.leftChild && node.rightChild) {
        npl = Math.min(computeNPL(node.leftChild), computeNPL(node.rightChild)) + 1;
      }
      else {
        npl = 0;
      }
      nplDic[node.value] = npl;
    }
    return npl;
  }

  function loopNode(node) {
    let leftNPL = -1;
    if (node.leftChild) {
      if (node.leftChild.parent.value !== node.value) {
        throw new Error(`节点${node.value}的左子节点${node.leftChild.value}的父节点引用不对`);
      }
      if (node.value >= node.leftChild.value) {
        throw new Error(`父节点${node.value}比左子节点${node.leftChild.value}大`);
      }
      leftNPL = computeNPL(node.leftChild);
      if (leftNPL !== node.leftChild.npl) {
        throw new Error(`节点${node.leftChild.value}的NPL计算错误`);
      }
      loopNode(node.leftChild);
    }
    values.push(node.value);
    let rightNPL = -1;
    if (node.rightChild) {
      if (node.rightChild.parent.value !== node.value) {
        throw new Error(`节点${node.value}的右子节点${node.rightChild.value}的父节点引用不对`);
      }
      if (node.value >= node.rightChild.value) {
        throw new Error(`父节点${node.value}比右子节点${node.rightChild.value}大`);
      }
      rightNPL = computeNPL(node.rightChild);
      if (rightNPL !== node.rightChild.npl) {
        throw new Error(`节点${node.rightChild.value}的NPL计算错误`);
      }
      loopNode(node.rightChild);
    }
    if (leftNPL < rightNPL) {
      throw new Error(`节点${node.value}的左子树的NPL${leftNPL}比右子树的NPL${rightNPL}小`);
    }
  }
}
