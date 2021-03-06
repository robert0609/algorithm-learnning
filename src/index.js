/**
* 主模块文件
*/
import 'babel-polyfill';
// import { run } from './maxSumOfChildArray';
// import { run } from './minSumOfChildArray';
// import { run } from './minPositiveSumOfChildArray';
// import { run } from './intersection';
// import { run } from './binarySearchTree';
// import { run } from './avlTree';
// import { run } from './binaryFullTree';
// import { run } from './quickSort';
// import { run } from './redBlackTree';
// import { run } from './splayTree';
// import { run } from './leftHeap';
// import { run } from './binomialQueue';
// import { run } from './unionFindSet';
// import { run } from './graphic';
import { run } from './graphicNonDirective';

/**
 * 入口函数
 */
function main(...args) {
  run();
}

/**
 * 缺省执行main函数
 */
main(...process.argv.slice(2));
