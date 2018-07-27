
const privatePropertySet = Symbol('basePrivatePropertySet');

function parameterCanNotBeNull(name) {
  throw new Error(`${name} can not be null!`);
}

export class BinarySearchTreeNode {
  constructor(value = parameterCanNotBeNull(), {
    leftChild = null,
    rightChild = null
  } = {}) {
    this[privatePropertySet] = {
      value,
      parent: null,
      leftChild: null,
      rightChild: null
    };
    if (leftChild) {
      this[privatePropertySet].leftChild = leftChild;
      leftChild.parent = this;
    }
    if (rightChild) {
      this[privatePropertySet].rightChild = rightChild;
      rightChild.parent = this;
    }

    Object.defineProperties(this, {
      value: {
        get() {
          return this[privatePropertySet].value;
        },
        set(v) {
          this[privatePropertySet].value = v;
        },
        enumerable: true
      },
      parent: {
        get() {
          return this[privatePropertySet].parent;
        },
        set(v) {
          this[privatePropertySet].parent = v;
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
            v.parent = this;
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
            v.parent = this;
          }
        },
        enumerable: true
      }
    });
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
      return this;
    }
  }
  findMin() {
    if (this.leftChild) {
      return this.leftChild.findMin();
    }
    else {
      return this;
    }
  }
  findMax() {
    if (this.rightChild) {
      return this.rightChild.findMax();
    }
    else {
      return this;
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
      }
    }
    return { insertResult, trulyInsert };
  }
  delete(value) {
    let deleteResult = false, trulyDelete = false;
    if (value < this.value) {
      if (this.leftChild) {
        ({ deleteResult, trulyDelete } = this.leftChild.delete(value));
      }
    }
    else if (this.value < value) {
      if (this.rightChild) {
        ({ deleteResult, trulyDelete } = this.rightChild.delete(value));
      }
    }
    else {
      if (this.rightChild) {
        let replaceNode = this.rightChild.findMin();
        this.value = replaceNode.value;
        ({ deleteResult, trulyDelete } = this.rightChild.delete(replaceNode.value));
      }
      else if (this.leftChild) {
        let replaceNode = this.leftChild.findMax();
        this.value = replaceNode.value;
        ({ deleteResult, trulyDelete } = this.leftChild.delete(replaceNode.value));
      }
      else {
        if (this.parent) {
          if (this.parent.rightChild && this.value === this.parent.rightChild.value) {
            this.parent.rightChild = null;
          }
          else if (this.parent.leftChild && this.value === this.parent.leftChild.value) {
            this.parent.leftChild = null;
          }
          this.parent = null;
        }
        deleteResult = true;
        trulyDelete = true;
      }
    }
    return { deleteResult, trulyDelete };
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
