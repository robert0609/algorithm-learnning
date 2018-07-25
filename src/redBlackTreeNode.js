/**
 * 红黑树的特性:
 * （1）每个节点或者是黑色，或者是红色。
 * （2）根节点是黑色。
 * （3）每个叶子节点（NIL）是黑色。 [注意：这里叶子节点，是指为空(NIL或NULL)的叶子节点！]
 * （4）如果一个节点是红色的，则它的子节点必须是黑色的。
 * （5）从一个节点到该节点的子孙节点的所有路径上包含相同数目的黑节点。
 * 注意：
 *  (01) 特性(3)中的叶子节点，是只为空(NIL或null)的节点。
 *  (02) 特性(5)，确保没有一条路径会比其他路径长出俩倍。因而，红黑树是相对是接近平衡的二叉树。
 */
import { BinarySearchTreeNode } from './binarySearchTreeImmediatelyNode';

const privatePropertySet = Symbol('privatePropertySet');
const checkBlackHeight = Symbol('checkBlackHeight');
const computeBlackHeight = Symbol('computeBlackHeight');

const EnumColor = {
  red: 1,
  black: 2
};

function parameterCanNotBeNull(name) {
  throw new Error(`${name} can not be null!`);
}

export class RedBlackTreeNode extends BinarySearchTreeNode {
  constructor(value = parameterCanNotBeNull(), {
    leftChild = null,
    rightChild = null
  } = {}) {
    super(value, {
      leftChild,
      rightChild
    });

    this[privatePropertySet] = {
      color: EnumColor.black
    };

    Object.defineProperties(this, {
      color: {
        get() {
          return this[privatePropertySet].color;
        },
        set(v) {
          this[privatePropertySet].color = v;
        },
        enumerable: true
      },
      blackHeight: {
        get() {
          if (this[privatePropertySet].color === EnumColor.black) {
            return this[computeBlackHeight]() + 1;
          }
          else {
            return this[computeBlackHeight]();
          }
        },
        enumerable: true
      }
    });
  }

  get leftChildBlackHeight() {
    if (this.leftChild) {
      return this.leftChild.blackHeight;
    }
    else {
      return 0;
    }
  }
  get rightChildBlackHeight() {
    if (this.rightChild) {
      return this.rightChild.blackHeight;
    }
    else {
      return 0;
    }
  }

  [checkBlackHeight]() {
    return this.leftChildBlackHeight === this.rightChildBlackHeight;
  }

  [computeBlackHeight]() {
    return Math.max(this.leftChildBlackHeight, this.rightChildBlackHeight);
  }

  insert(value) {
    let { insertResult, trulyInsert } = super.insert(value);
    if (trulyInsert) {
      //做平衡处理
      this.balanceAfterInsert();
    }
    return { insertResult, trulyInsert };
  }
  delete(value) {
    let { deleteResult, trulyDelete } = super.delete(value);
    if (trulyDelete) {
      //做平衡处理
      this.balanceAfterDelete();
    }
    return { deleteResult, trulyDelete };
  }
  balanceAfterInsert() {
    if (this.leftChildBlackHeight > this.rightChildBlackHeight) {
      //左子节点的黑高度大
      if (this.leftChild.leftChildBlackHeight > this.leftChild.rightChildBlackHeight) {
        //左孙节点的黑高度大。左子节点此时必是红的，进行如下判断
        if (this.rightChild && this.rightChild.color === EnumColor.red) {
          //右子节点存在且为红色
          //变色
          this.leftChild.leftChild.color = EnumColor.red;
          this.leftChild.color = EnumColor.black;
          this.rightChild.color = EnumColor.black;
          //变色之后当前整个子树的黑高度都一致了，但是比原来增加了1，因此递归到上一级父节点的时候会继续再平衡处理
        }
        else {
          //右子节点不存在
          //旋转
          this.clockwiseRotate();
          //变色
          this.color = EnumColor.black;
          this.leftChild.color = EnumColor.red;
          this.rightChild.color = EnumColor.red;
        }
      }
      else if (this.leftChild.leftChildBlackHeight < this.leftChild.rightChildBlackHeight) {
        //右孙节点的黑高度大。左子节点此时必是红的，进行如下判断
        if (this.rightChild && this.rightChild.color === EnumColor.red) {
          //右子节点存在且为红色
          //变色
          this.leftChild.rightChild.color = EnumColor.red;
          this.leftChild.color = EnumColor.black;
          this.rightChild.color = EnumColor.black;
          //变色之后当前整个子树的黑高度都一致了，但是比原来增加了1，因此递归到上一级父节点的时候会继续再平衡处理
        }
        else {
          //右子节点不存在
          //旋转
          this.leftChild.anticlockwiseRotate();
          this.clockwiseRotate();
          //变色
          this.color = EnumColor.black;
          this.leftChild.color = EnumColor.red;
          this.rightChild.color = EnumColor.red;
        }
      }
      else {
        if (this.color === EnumColor.black) {
          //当前节点如果是黑的，则左子节点直接涂成红色
          this.leftChild.color = EnumColor.red;
        }
      }
    }
    else if (this.leftChildBlackHeight < this.rightChildBlackHeight) {
      //右子节点的黑高度大
      if (this.rightChild.leftChildBlackHeight > this.rightChild.rightChildBlackHeight) {
        //左孙节点的黑高度大。右子节点此时必是红的，进行如下判断
        if (this.leftChild && this.leftChild.color === EnumColor.red) {
          //左子节点存在且为红色
          //变色
          this.rightChild.leftChild.color = EnumColor.red;
          this.leftChild.color = EnumColor.black;
          this.rightChild.color = EnumColor.black;
          //变色之后当前整个子树的黑高度都一致了，但是比原来增加了1，因此递归到上一级父节点的时候会继续再平衡处理
        }
        else {
          //左子节点不存在
          //旋转
          this.rightChild.clockwiseRotate();
          this.anticlockwiseRotate();
          //变色
          this.color = EnumColor.black;
          this.leftChild.color = EnumColor.red;
          this.rightChild.color = EnumColor.red;
        }
      }
      else if (this.rightChild.leftChildBlackHeight < this.rightChild.rightChildBlackHeight) {
        //右孙节点的黑高度大。右子节点此时必是红的，进行如下判断
        if (this.leftChild && this.leftChild.color === EnumColor.red) {
          //左子节点存在且为红色
          //变色
          this.rightChild.rightChild.color = EnumColor.red;
          this.leftChild.color = EnumColor.black;
          this.rightChild.color = EnumColor.black;
          //变色之后当前整个子树的黑高度都一致了，但是比原来增加了1，因此递归到上一级父节点的时候会继续再平衡处理
        }
        else {
          //左子节点不存在
          //旋转
          this.anticlockwiseRotate();
          //变色
          this.color = EnumColor.black;
          this.leftChild.color = EnumColor.red;
          this.rightChild.color = EnumColor.red;
        }
      }
      else {
        if (this.color === EnumColor.black) {
          //当前节点如果是黑的，则右子节点直接涂成红色
          this.rightChild.color = EnumColor.red;
        }
      }
    }
  }
  balanceAfterDelete() {
    if (this.leftChildBlackHeight > this.rightChildBlackHeight) {
      //左子节点的黑高度大
      if (this.leftChild.color === EnumColor.red) {
        //左子节点如果是红的
        //旋转
        this.clockwiseRotate();
        //变色
        this.color = EnumColor.black;
        this.rightChild.color = EnumColor.red;
        //此时右子节点转换成了同级别的左子节点是黑色的处理情况，调用右子节点的平衡处理
        this.rightChild.balanceAfterDelete();
      }
      else {
        //左子节点如果是黑的
        if (this.leftChild.leftChild && this.leftChild.leftChild.color === EnumColor.red) {
          //左孙节点不为空且为红色
          let rootOriginColor = this.color;
          //旋转
          this.clockwiseRotate();
          //变色
          this.color = rootOriginColor;
          this.leftChild.color = EnumColor.black;
          this.rightChild.color = EnumColor.black;
        }
        else if (this.leftChild.rightChild && this.leftChild.rightChild.color === EnumColor.red) {
          //右孙节点不为空且为红色
          let rootOriginColor = this.color;
          //旋转
          this.leftChild.anticlockwiseRotate();
          this.clockwiseRotate();
          //变色
          this.color = rootOriginColor;
          this.leftChild.color = EnumColor.black;
          this.rightChild.color = EnumColor.black;
        }
        else {
          //左右孙节点都为空或者都为黑色
          if (this.color === EnumColor.red) {
            //自身节点是红色
            //变色
            this.color = EnumColor.black;
            this.leftChild.color = EnumColor.red;
          }
          else {
            //自身节点是黑色
            //变色
            this.leftChild.color = EnumColor.red;
            //变色之后当前整个子树的黑高度都一致了，但是比原来减少了1，因此递归到上一级父节点的时候会继续再平衡处理
          }
        }
      }
    }
    else if (this.leftChildBlackHeight < this.rightChildBlackHeight) {
      //右子节点的黑高度大
      if (this.rightChild.color === EnumColor.red) {
        //右子节点如果是红的
        //旋转
        this.anticlockwiseRotate();
        //变色
        this.color = EnumColor.black;
        this.leftChild.color = EnumColor.red;
        //此时左子节点转换成了同级别的右子节点是黑色的处理情况，调用左子节点的平衡处理
        this.leftChild.balanceAfterDelete();
      }
      else {
        //右子节点如果是黑的
        if (this.rightChild.leftChild && this.rightChild.leftChild.color === EnumColor.red) {
          //左孙节点不为空且为红色
          let rootOriginColor = this.color;
          //旋转
          this.rightChild.clockwiseRotate();
          this.anticlockwiseRotate();
          //变色
          this.color = rootOriginColor;
          this.leftChild.color = EnumColor.black;
          this.rightChild.color = EnumColor.black;
        }
        else if (this.rightChild.rightChild && this.rightChild.rightChild.color === EnumColor.red) {
          //右孙节点不为空且为红色
          let rootOriginColor = this.color;
          //旋转
          this.anticlockwiseRotate();
          //变色
          this.color = rootOriginColor;
          this.leftChild.color = EnumColor.black;
          this.rightChild.color = EnumColor.black;
        }
        else {
          //左右孙节点都为空或者都为黑色
          if (this.color === EnumColor.red) {
            //自身节点是红色
            //变色
            this.color = EnumColor.black;
            this.rightChild.color = EnumColor.red;
          }
          else {
            //自身节点是黑色
            //变色
            this.rightChild.color = EnumColor.red;
            //变色之后当前整个子树的黑高度都一致了，但是比原来减少了1，因此递归到上一级父节点的时候会继续再平衡处理
          }
        }
      }
    }
  }
  clockwiseRotate() {
    super.clockwiseRotate();
  }
  anticlockwiseRotate() {
    super.anticlockwiseRotate();
  }
}
