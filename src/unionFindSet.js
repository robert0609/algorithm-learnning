import { padLeft } from './validate';

const privatePropertySet = Symbol('privatePropertySet');
const _getHashId = Symbol('getHashId');

export class UnionFindSet {
  constructor(valueList = [], getHashId = v => v) {
    this[privatePropertySet] = {
      buffer: []
    };
    this[_getHashId] = getHashId;

    valueList.forEach(value => {
      this[privatePropertySet].buffer[this[_getHashId](value)] = -1;
    });
  }

  find(value) {
    let buffer = this[privatePropertySet].buffer;
    let values = [];
    let rootValue = loop(this[_getHashId](value));
    // console.log(`${this[_getHashId](value)}的集合名是${rootValue}`);
    //路径压缩
    values.forEach(v => {
      buffer[v] = rootValue;
    });
    return rootValue;

    function loop(value) {
      let parentValue = buffer[value];
      if (parentValue >= 0) {
        values.push(value);
        return loop(parentValue);
      }
      else {
        return value;
      }
    }
  }

  union(value1, value2) {
    let buffer = this[privatePropertySet].buffer;
    let set1 = loop(this[_getHashId](value1));
    let set2 = loop(this[_getHashId](value2));
    if (set1 === set2) {
      return;
    }
    let count1 = buffer[set1];
    let count2 = buffer[set2];
    //按照大小合并
    if (count1 <= count2) {
      buffer[set2] = set1;
      buffer[set1] = count1 + count2;
    }
    else {
      buffer[set1] = set2;
      buffer[set2] = count1 + count2;
    }
    // console.log(`合并${this[_getHashId](value1)}与${this[_getHashId](value2)}所属的集合`);

    function loop(value) {
      let parentValue = buffer[value];
      if (parentValue >= 0) {
        return loop(parentValue);
      }
      else {
        return value;
      }
    }
  }

  display() {
    let buffer = this[privatePropertySet].buffer;
    let indexList = 'values:          ';
    let parentOrCount = 'parent or count: ';
    buffer.forEach((item, index) => {
      if (item === undefined) {
        return;
      }
      indexList += padLeft(index.toString(), 3) + ',';
      parentOrCount += padLeft(item.toString(), 3) + ',';
    });
    console.log(indexList);
    console.log(parentOrCount);
  }
}

export function run() {
  let unionFindSet = new UnionFindSet([0,1,2,3,4,5,6,7,8,9,10]);
  unionFindSet.display();
  unionFindSet.find(5);
  unionFindSet.find(8);
  unionFindSet.union(5, 8);
  unionFindSet.display();
  unionFindSet.union(4, 9);
  unionFindSet.display();
  unionFindSet.union(8, 1);
  unionFindSet.display();
  unionFindSet.union(9, 10);
  unionFindSet.display();
  unionFindSet.union(10, 2);
  unionFindSet.display();
  unionFindSet.union(1, 2);
  unionFindSet.display();
  unionFindSet.find(8);
  unionFindSet.display();
}
