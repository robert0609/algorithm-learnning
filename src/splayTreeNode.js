
const privatePropertySet = Symbol('basePrivatePropertySet');

function parameterCanNotBeNull(name) {
  throw new Error(`${name} can not be null!`);
}

const EnumSide = {
  left: 1,
  right: 2
};

export class SplayTreeNode {
  constructor(value = parameterCanNotBeNull(), {
    leftChild = null,
    rightChild = null
  } = {}) {
    this[privatePropertySet] = {
      value,
      parent: null,
      sideOfParent: null,
      leftChild: null,
      rightChild: null
    };

    Object.defineProperties(this, {
      value: {
        get() {
          return this[privatePropertySet].value;
        },
        enumerable: true
      },
      parent: {
        get() {
          return this[privatePropertySet].parent;
        },
        enumerable: false
      },
      sideOfParent: {
        get() {
          return this[privatePropertySet].sideOfParent;
        },
        enumerable: false
      },
      leftChild: {
        get() {
          return this[privatePropertySet].leftChild;
        },
        set(v) {
          this[privatePropertySet].leftChild = v;
          if (v) {
            v[privatePropertySet].parent = this;
            v[privatePropertySet].sideOfParent = EnumSide.left;
          }
        },
        enumerable: true
      },
      rightChild: {
        get() {
          return this[privatePropertySet].rightChild;
        },
        set(v) {
          this[privatePropertySet].rightChild = v;
          if (v) {
            v[privatePropertySet].parent = this;
            v[privatePropertySet].sideOfParent = EnumSide.right;
          }
        },
        enumerable: true
      }
    });

    if (leftChild) {
      this.leftChild = leftChild;
    }
    if (rightChild) {
      this.rightChild = rightChild;
    }
  }

  find(value) {
    if (value < this.value) {
      if (this.leftChild) {
        return this.leftChild.find(value);
      }
      else {
        return null;
      }
    }
    else if (this.value < value) {
      if (this.rightChild) {
        return this.rightChild.find(value);
      }
      else {
        return null;
      }
    }
    else {
      //找到之后，将本节点伸展到根结点，然后返回
      return this.splay();
    }
  }
  findMin() {
    if (this.leftChild) {
      return this.leftChild.findMin();
    }
    else {
      return this.splay();
    }
  }
  findMax() {
    if (this.rightChild) {
      return this.rightChild.findMax();
    }
    else {
      return this.splay();
    }
  }
  insert(value) {
    let insertResult = false, trulyInsert = false;
    if (value < this.value) {
      if (this.leftChild) {
        ({ insertResult, trulyInsert } = this.leftChild.insert(value));
      }
      else {
        this.leftChild = new this.constructor(value);
        insertResult = true;
        trulyInsert = true;
        this.leftChild.splay();
      }
    }
    else if (this.value < value) {
      if (this.rightChild) {
        ({ insertResult, trulyInsert } = this.rightChild.insert(value));
      }
      else {
        this.rightChild = new this.constructor(value);
        insertResult = true;
        trulyInsert = true;
        this.rightChild.splay();
      }
    }
    return { insertResult, trulyInsert };
  }
  delete(value) {
    let nodeToDelete = this.find(value);
    let privateSet = nodeToDelete[privatePropertySet];
    let leftRootNode = nodeToDelete.leftChild;
    let rightRootNode = nodeToDelete.rightChild;
    if (leftRootNode && rightRootNode) {
      //将左子树拆分出来
      nodeToDelete.leftChild = null;
      leftRootNode[privatePropertySet].parent = null;
      leftRootNode[privatePropertySet].sideOfParent = null;
      //找到左子树的最大节点，并伸展到根部
      let newLeftRootNode = leftRootNode.findMax();
      //合并两个子树
      privateSet.value = newLeftRootNode.value;
      nodeToDelete.leftChild = newLeftRootNode.leftChild;
    }
    else if (!leftRootNode) {
      privateSet.value = rightRootNode.value;
      nodeToDelete.leftChild = rightRootNode.leftChild;
      nodeToDelete.rightChild = rightRootNode.rightChild;
    }
    else {
      privateSet.value = leftRootNode.value;
      nodeToDelete.leftChild = leftRootNode.leftChild;
      nodeToDelete.rightChild = leftRootNode.rightChild;
    }
  }
  splay() {
    let father = this.parent;
    if (!father) {
      return this;
    }
    let grandfather = father.parent;
    if (!grandfather) {
      if (this.sideOfParent === EnumSide.left) {
        father.clockwiseRotate();
      }
      else {
        father.anticlockwiseRotate();
      }
      return father;
    }
    if (this.sideOfParent === father.sideOfParent) {
      if (this.sideOfParent === EnumSide.left) {
        //LL
        grandfather.clockwiseRotate();
        grandfather.clockwiseRotate();
      }
      else {
        //RR
        grandfather.anticlockwiseRotate();
        grandfather.anticlockwiseRotate();
      }
    }
    else {
      if (this.sideOfParent === EnumSide.left) {
        //LR
        father.clockwiseRotate();
        grandfather.anticlockwiseRotate();
      }
      else {
        //RL
        father.anticlockwiseRotate();
        grandfather.clockwiseRotate();
      }
    }
    return grandfather.splay();
  }
  clockwiseRotate() {
    let privateSet = this[privatePropertySet];
    let origin_root = this;
    let origin_root_left = origin_root.leftChild;

    let new_root_right = new this.constructor(origin_root.value, {
      leftChild: origin_root_left.rightChild,
      rightChild: origin_root.rightChild
    });

    privateSet.value = origin_root_left.value;
    this.leftChild = origin_root_left.leftChild;
    this.rightChild = new_root_right;
  }
  anticlockwiseRotate() {
    let privateSet = this[privatePropertySet];
    let origin_root = this;
    let origin_root_right = origin_root.rightChild;

    let new_root_left = new this.constructor(origin_root.value, {
      leftChild: origin_root.leftChild,
      rightChild: origin_root_right.leftChild
    });

    privateSet.value = origin_root_right.value;
    this.leftChild = new_root_left;
    this.rightChild = origin_root_right.rightChild;
  }
}
