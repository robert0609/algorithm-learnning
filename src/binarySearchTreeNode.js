
const privatePropertySet = Symbol('basePrivatePropertySet');
const computeNodeCount = Symbol('computeNodeCount');

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
      rightChild: null,
      isDelete: false
    };
    if (leftChild && leftChild.nodeCount > 0) {
      this[privatePropertySet].leftChild = leftChild;
      leftChild.parent = this;
    }
    if (rightChild && rightChild.nodeCount > 0) {
      this[privatePropertySet].rightChild = rightChild;
      rightChild.parent = this;
    }
    this[computeNodeCount]();

    Object.defineProperties(this, {
      value: {
        get() {
          return this[privatePropertySet].value;
        },
        enumerable: true
      },
      nodeCount: {
        get() {
          return this[privatePropertySet].nodeCount;
        },
        enumerable: true
      },
      isDelete: {
        get() {
          return this[privatePropertySet].isDelete;
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

  [computeNodeCount]() {
    let privateSet = this[privatePropertySet];
    privateSet.nodeCount = (this.leftChild ? this.leftChild.nodeCount : 0) + (this.rightChild ? this.rightChild.nodeCount : 0) + (this.isDelete ? 0 : 1);
    // console.log(`value[${this.value}] node compute nodeCount: ${this.nodeCount}`);
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
      return this.isDelete ? null : this;
    }
  }
  findMin() {
    if (this.leftChild && this.leftChild.nodeCount > 0) {
      return this.leftChild.findMin();
    }
    else if (this.isDelete) {
      if (this.rightChild && this.rightChild.nodeCount > 0) {
        return this.rightChild.findMin();
      }
      else {
        return null;
      }
    }
    else {
      return this;
    }
  }
  findMax() {
    if (this.rightChild && this.rightChild.nodeCount > 0) {
      return this.rightChild.findMax();
    }
    else if (this.isDelete) {
      if (this.leftChild && this.leftChild.nodeCount > 0) {
        return this.leftChild.findMax();
      }
      else {
        return null;
      }
    }
    else {
      return this;
    }
  }
  insert(value) {
    let insertResult = false, trulyInsert = false;
    let privateSet = this[privatePropertySet];
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
    else {
      if (this.isDelete) {
        privateSet.isDelete = false;
        insertResult = true;
      }
    }
    if (insertResult) {
      privateSet.nodeCount += 1;
    }
    return { insertResult, trulyInsert };
  }
  delete(value) {
    let deleteResult = false, trulyDelete = false;
    let privateSet = this[privatePropertySet];
    if (value < this.value) {
      if (this.leftChild) {
        ({ deleteResult, trulyDelete } = this.leftChild.delete(value));
        if (deleteResult) {
          //lazy delete
          if (this.leftChild.nodeCount === 0) {
            this.leftChild = null;
            trulyDelete = true;
            // console.log(`value[${this.value}] truly delete leftChild`);
          }
        }
      }
    }
    else if (this.value < value) {
      if (this.rightChild) {
        ({ deleteResult, trulyDelete } = this.rightChild.delete(value));
        if (deleteResult) {
          //lazy delete
          if (this.rightChild.nodeCount === 0) {
            this.rightChild = null;
            trulyDelete = true;
            // console.log(`value[${this.value}] truly delete rightChild`);
          }
        }
      }
    }
    else {
      if (!this.isDelete) {
        privateSet.isDelete = true;
        deleteResult = true;
      }
    }
    if (deleteResult) {
      privateSet.nodeCount -= 1;
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
    new_root_right[privatePropertySet].isDelete = origin_root.isDelete;
    new_root_right[computeNodeCount]();

    privateSet.value = origin_root_left.value;
    this.leftChild = (!origin_root_left.leftChild || origin_root_left.leftChild.nodeCount === 0) ? null : origin_root_left.leftChild;
    this.rightChild = (!new_root_right || new_root_right.nodeCount === 0) ? null : new_root_right;
    privateSet.isDelete = origin_root_left.isDelete;
    this[computeNodeCount]();
  }
  anticlockwiseRotate() {
    let privateSet = this[privatePropertySet];
    let origin_root = this;
    let origin_root_right = origin_root.rightChild;

    let new_root_left = new this.constructor(origin_root.value, {
      leftChild: origin_root.leftChild,
      rightChild: origin_root_right.leftChild
    });
    new_root_left[privatePropertySet].isDelete = origin_root.isDelete;
    new_root_left[computeNodeCount]();

    privateSet.value = origin_root_right.value;
    this.leftChild = (!new_root_left || new_root_left.nodeCount === 0) ? null : new_root_left;
    this.rightChild = (!origin_root_right.rightChild || origin_root_right.rightChild.nodeCount === 0) ? null : origin_root_right.rightChild;
    privateSet.isDelete = origin_root_right.isDelete;
    this[computeNodeCount]();
  }
}
