
function output(arr) {
  // let { resultArr, result } = minPositiveSum(arr);
  // console.log(`minArr: ${JSON.stringify(resultArr)}; minSum: ${result}`);
  let resultCompare = minPositiveSumCompare(arr);
  console.log(`compare minSum: ${resultCompare}`);
  return 'over';
}

function minPositiveSum(arr) {
  let resultArr = [];
  let result = Infinity;
  for (let i = 0; i < arr.length; ++i) {
    // let arrTemp = [ arr[i] ];
    let sum = arr[i];
    if (sum >= 0 && sum < result) {
      // resultArr = [ ...arrTemp ];
      result = sum;
    }
    for (let j = i + 1; j < arr.length; ++j) {
      // arrTemp.push(arr[j]);
      sum += arr[j];
      if (sum >= 0 && sum < result) {
        // resultArr = [ ...arrTemp ];
        result = sum;
      }
    }
  }
  return { resultArr, result };
}

function minPositiveSumCompare(arr) {
  let result = Infinity;

  for (let i = 0; i < arr.length; ++i) {
    let sum = loop(arr, i, 0);
    if (sum < result) {
      result = sum;
    }
  }

  return result;
}
function loop(arr, i, k) {
  let ei = arr[i];
  if (ei >= k) {
    if (i === 0) {
      return ei;
    }
    else {
      return Math.min(ei, (loop(arr, i - 1, k - ei) + ei));
    }
  }
  else {
    if (i === 0) {
      return Infinity;
    }
    else {
      return loop(arr, i - 1, k - ei) + ei;
    }
  }
}

export function run() {
  // console.log(output([-6, 2, -3, -23, 10, -11, -5, 9, -5, 15, -7]));
  // console.log(output([-6, 2, -3, -23, 10, -11, -5, 9, -4, 15, -7]));
  // console.log(output([-6, 2, -3, -23, 10, -11, -5, 9, -3, 15, -7]));
  // console.log(output([6, 2, -3, -23, 10, -11, 42, -5, 9, -3, 15, -7]));
  // console.log(output([6, -2, -3, -23, 10, -11, 42, -5, 9, -5, 15, -7]));
  // console.log(output([-6, -2, -3, -23, -10, -11, -42, -5, -9, -4, -15, -7]));
  // console.log(output([6, 2, 3, 23, 10, 11, 42, 5, 9, 4, 15, 7]));

  console.log(output([-6, -2, -3, -23, -10, -11, -42, -5, -9, -4, -15, -7, 6, 24, -45, 100, 3, -4, 8, 56,3, -7, 10, -11, -42, -5, -9, -4, -15, -7, 6, 24, -45, 100, 3,-6, -2, -3, -23, -10, -11, -42, -5, -9, -4, -15, -7, 6, 24, -45, 100, 3, -4, 8, 56,3, -7, 10, -11, -42, -5, -9, -4, -15, -7, 6, 24, -45, 100, 3,-6, -2, -3, -23, -10, -11, -42, -5, -9, -4, -15, -7, 6, 24, -45, 100, 3, -4, 8, 56,3, -7, 10, -11, -42, -5, -9, -4, -15, -7, 6, 24, -45, 100, 3,-6, -2, -3, -23, -10, -11, -42, -5, -9, -4, -15, -7, 6, 24, -45, 100, 3, -4, 8, 56,3, -7, 10, -11, -42, -5, -9, -4, -15, -7, 6, 24, -45, 100, 3,-6, -2, -3, -23, -10, -11, -42, -5, -9, -4, -15, -7, 6, 24, -45, 100, 3, -4, 8, 56,3, -7, 10, -11, -42, -5, -9, -4, -15, -7, 6, 24, -45, 100, 3]));
}
