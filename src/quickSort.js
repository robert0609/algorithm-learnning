
function sort(list, left = null, right = null) {
  left = left === null ? 0 : left;
  right = right === null ? list.length - 1 : right;

  if (left >= right) {
    return list;
  }

  let partionIndex;
  ({ list, partionIndex } = partion(list, left, right));
  list = sort(list, left, partionIndex - 1);
  list = sort(list, partionIndex + 1, right);
  return list;
}

function partion(list, left, right) {
  let temp = list[right];
  while (left < right) {
    while (left < right && list[left] <= temp) {
      ++left;
    }
    if (left < right) {
      list[right] = list[left];
      --right;
    }
    while (left < right && list[right] > temp) {
      --right;
    }
    if (left < right) {
      list[left] = list[right];
      ++left;
    }
  }
  list[left] = temp;

  return {
    list,
    partionIndex: left
  };
}


export function run() {
  let result = sort([8,1,5,4,9,3,7,2,6,8,1,5,4]);
  console.log(result);
}
