
function output(arr) {
  let result = 0;
  let sum = 0;
  for (let i = 0; i < arr.length; ++i) {
    sum += arr[i];
    if (sum < 0) {
      sum = 0;
    }
    if (sum > result) {
      result = sum;
    }
  }
  return result;
}

export function run() {
  // return output([6, 2, -3, 23, 10, 0, -5, 9, -4, 15, -7]);
  return output([-6, -2, -3, -23, -10, -5, -9, -4, -15, -7]);
}
