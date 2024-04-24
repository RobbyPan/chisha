/**
 * 输出数组中元素，用空格隔开
 */
function arrayToString(arr) {
  return arr.join(" ");
}

/**
 * 把空格隔开的各个元素，转成数组
 */
function stringToArray(str) {
  return str.trim().split(" ");
}

export { arrayToString, stringToArray };
