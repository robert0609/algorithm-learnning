
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
      return this;
    }
  }
  findMin() {}
  findMax() {}
  insert(value) {}
  delete(value) {}
  splay() {
    let father = this.parent;
    if (!father) {
      return;
    }
    let grandfather = father.parent;
    if (!grandfather) {
      if (this.sideOfParent === EnumSide.left) {
        this.parent.clockwiseRotate();
      }
      else {
        this.parent.anticlockwiseRotate();
      }
    }
    else {
      if (this.sideOfParent === this.parent.sideOfParent) {
        if (this.sideOfParent === EnumSide.left) {
          //LL
          this.parent.parent.clockwiseRotate();
        }
        else {
          //RR
        }
      }
      else {}
    }
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
