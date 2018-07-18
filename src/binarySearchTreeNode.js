
const privatePropertySet = Symbol('privatePropertySet');
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
      leftChild: (!leftChild || leftChild.nodeCount === 0) ? null : leftChild,
      rightChild: (!rightChild || rightChild.nodeCount === 0) ? null : rightChild,
      isDelete: false
    };
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
      leftChild: {
        get() {
          return this[privatePropertySet].leftChild;
        },
        enumerable: true
      },
      rightChild: {
        get() {
          return this[privatePropertySet].rightChild;
        },
        enumerable: true
      }
    });
  }

  [computeNodeCount]() {
    let privateSet = this[privatePropertySet];
    privateSet.nodeCount = (privateSet.leftChild ? privateSet.leftChild.nodeCount : 0) + (privateSet.rightChild ? privateSet.rightChild.nodeCount : 0) + (privateSet.isDelete ? 0 : 1);
    // console.log(`value[${privateSet.value}] node compute nodeCount: ${privateSet.nodeCount}`);
  }

  find(value) {
    let privateSet = this[privatePropertySet];
    if (value < privateSet.value) {
      if (privateSet.leftChild) {
        return privateSet.leftChild.find(value);
      }
      else {
        return null;
      }
    }
    else if (privateSet.value < value) {
      if (privateSet.rightChild) {
        return privateSet.rightChild.find(value);
      }
      else {
        return null;
      }
    }
    else {
      return privateSet.isDelete ? null : this;
    }
  }
  findMin() {
    let privateSet = this[privatePropertySet];
    if (privateSet.leftChild && privateSet.leftChild[privatePropertySet].nodeCount > 0) {
      return privateSet.leftChild.findMin();
    }
    else if (privateSet.isDelete) {
      if (privateSet.rightChild && privateSet.rightChild[privatePropertySet].nodeCount > 0) {
        return privateSet.rightChild.findMin();
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
    let privateSet = this[privatePropertySet];
    if (privateSet.rightChild && privateSet.rightChild[privatePropertySet].nodeCount > 0) {
      return privateSet.rightChild.findMax();
    }
    else if (privateSet.isDelete) {
      if (privateSet.leftChild && privateSet.leftChild[privatePropertySet].nodeCount > 0) {
        return privateSet.leftChild.findMax();
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
    if (value < privateSet.value) {
      if (privateSet.leftChild) {
        ({ insertResult, trulyInsert } = privateSet.leftChild.insert(value));
      }
      else {
        privateSet.leftChild = new this.constructor(value);
        insertResult = true;
        trulyInsert = true;
      }
    }
    else if (privateSet.value < value) {
      if (privateSet.rightChild) {
        ({ insertResult, trulyInsert } = privateSet.rightChild.insert(value));
      }
      else {
        privateSet.rightChild = new this.constructor(value);
        insertResult = true;
        trulyInsert = true;
      }
    }
    else {
      if (privateSet.isDelete) {
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
    if (value < privateSet.value) {
      if (privateSet.leftChild) {
        ({ deleteResult, trulyDelete } = privateSet.leftChild.delete(value));
        if (deleteResult) {
          //lazy delete
          if (privateSet.leftChild[privatePropertySet].nodeCount === 0) {
            privateSet.leftChild = null;
            trulyDelete = true;
            // console.log(`value[${this.value}] truly delete leftChild`);
          }
        }
      }
    }
    else if (privateSet.value < value) {
      if (privateSet.rightChild) {
        ({ deleteResult, trulyDelete } = privateSet.rightChild.delete(value));
        if (deleteResult) {
          //lazy delete
          if (privateSet.rightChild[privatePropertySet].nodeCount === 0) {
            privateSet.rightChild = null;
            trulyDelete = true;
            // console.log(`value[${this.value}] truly delete rightChild`);
          }
        }
      }
    }
    else {
      if (!privateSet.isDelete) {
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
    privateSet.leftChild = (!origin_root_left.leftChild || origin_root_left.leftChild.nodeCount === 0) ? null : origin_root_left.leftChild;
    privateSet.rightChild = (!new_root_right || new_root_right.nodeCount === 0) ? null : new_root_right;
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
    privateSet.leftChild = (!new_root_left || new_root_left.nodeCount === 0) ? null : new_root_left;
    privateSet.rightChild = (!origin_root_right.rightChild || origin_root_right.rightChild.nodeCount === 0) ? null : origin_root_right.rightChild;
    privateSet.isDelete = origin_root_right.isDelete;
    this[computeNodeCount]();
  }
}
