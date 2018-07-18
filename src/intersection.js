/**
 *
 */
const a1 = [-25, -13, 0, 3, 7, 9, 15, 24, 600, 874, 1000];
const a2 = [-30, -1, -2, 1, 2, 3, 7, 874, 1235, 54376];

function getIntersection() {
  const result = [];
  const a1Cursor = {
    list: a1,
    index: 0
  };
  const a2Cursor = {
    list: a2,
    index: 0
  };
  let isa1 = true;
  let target = a2[a2Cursor.index];
  let loop = a1Cursor;
  while (loop.index < loop.list.length) {
    if (loop.list[loop.index] >= target) {
      if (loop.list[loop.index] === target) {
        result.push(loop.list[loop.index]);
      }
      target = isa1 ? a1[a1Cursor.index] : a2[a2Cursor.index];
      loop = isa1 ? a2Cursor : a1Cursor;
      isa1 = !isa1;
    }
    loop.index += 1;
  }

  return result;
}

export function run() {
  return getIntersection();
}
