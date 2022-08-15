function merge(arr1, arr2) {
  const sorted = [];
  while (arr1.length > 0 && arr2.length > 0) {
    if (arr1[0] > arr2[0]) {
      sorted.push(arr2.shift());
    } else {
      sorted.push(arr1.shift());
    }
  }
  const remainder = arr1.length > 0 ? arr1 : arr2;
  return sorted.concat(remainder);
}

function mergeSort(arr) {
  let firstHalf;
  let secondHalf;
  if (arr.length === 1) {
    return arr;
  }

  const half = Math.ceil(arr.length / 2);
  firstHalf = mergeSort(arr.slice(0, half));
  secondHalf = mergeSort(arr.slice(half));

  const sortedArr = merge(firstHalf, secondHalf);
  return sortedArr;
}

export default mergeSort;
