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

/**
 * 获取当前时间
 */
function getTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export { arrayToString, stringToArray, getTime };
