import removeDuplicates from './removeDuplicates.mjs';
import mergeSort from './sort.mjs';
import randomArr from './randomArr.mjs';

class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

function handleArray(arr) {
  const noDupes = removeDuplicates(arr);
  const sortedArr = mergeSort(noDupes);
  return sortedArr;
}

function buildTree(arr) {
  if (arr.length === 0) {
    return null;
  }
  const mid = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, mid);
  const rightArr = arr.slice(mid + 1, arr.length);

  const node = new Node(arr[mid]);
  node.left = buildTree(leftArr);
  node.right = buildTree(rightArr);
  return node;
}

function tree(arr) {
  let root = buildTree(handleArray(arr));

  const getRoot = () => root;

  const setNewNode = (value, node) => {
    if (node === null){
      return new Node(value);
    }
    if (value > node.value){
      node.right = setNewNode(value, node.right)
    }
    else if (value < node.value){
      node.left = setNewNode(value, node.left)
    }
    return node;
  }

  const traverseLeft = (node) => {
    let current = node;
    while (current.left) {
      current = current.left
    }
    return current;
  }

  const removeNode = (value, node) => {
    if (node === null) {
      return node;
    }
    if (value > node.value){
      node.right = removeNode(value, node.right)
    }
    else if (value < node.value){
      node.left = removeNode(value, node.left)
    }
    else if (value === node.value){
      if (node.left === null){
        return node.right
      }
      if (node.right === null) {
        return node.left
      }

      let replacementNode = traverseLeft(node.right)
      node.value = replacementNode.value;
      removeNode(node.value, node.right);
    }
    return node;
  }

  const insertNode = (value) => {
    root = setNewNode(value, root)
  }

  const deleteNode = (value) => {
    root = removeNode(value, root)
  }

  const levelOrderTraversal = (node) => {
    let current
    const queue = [node]
    let levelOrderValues = []

    while (queue.length > 0) {
      current = queue.shift()
      if (current) {
        levelOrderValues.push(current.value)
        queue.push(current.left, current.right)
      }
    }
    return levelOrderValues
  }

  const levelOrder = (fn) => {
    const values = levelOrderTraversal(root)
    if (fn) {
      values.forEach(el => { fn(el) })
    }
    else {
      return values;
    }
  }

  const preOrderTraversal = (node) => {
    if (!node) {
      return []
    }
    return [].concat(node.value, preOrderTraversal(node.left), preOrderTraversal(node.right))
  }

  const preOrder = (fn) => {
    const values = preOrderTraversal(root);
    if (fn) {
      values.forEach(el => { fn(el) })
    }
    else {
      return values;
    }
  }

  const inOrderTraversal = (node) => {
    if (!node) {
      return []
    }
    return [].concat(inOrderTraversal(node.left), node.value, inOrderTraversal(node.right))
  }

  const inOrder = (fn) => {
    const values = inOrderTraversal(root);
    if (fn) {
      values.forEach(el => { fn(el) });
    }
    else {
      return values;
    }
  }

  const postOrderTraversal = (node) => {
    if (!node) {
      return []
    }
    return [].concat(postOrderTraversal(node.left), postOrderTraversal(node.right), node.value,)
  }

  const postOrder = (fn) => {
    const values = postOrderTraversal(root);
    if (fn) {
      values.forEach(el => { fn(el) });
    }
    else {
      return values;
    }
  }

  const height = (node = root) => {
    if (node === null) {
      return -1;
    }
    let left = 1 + height(node.left);
    let right = 1 + height(node.right);
    
    return left > right ? left : right;
  }

  const find = (value) => {
    let current = root;
    while (current) {
      if (current.value === value) {
        return current;
      }
      if (current.value < value) {
        current = current.right;
      }
      else if (current.value > value) {
        current = current.left;
      }
    }
    return current;
  }

  const depth = (node = root) => {
    let current = root;
    let step = 0;
    while (true){
      if (current.value === node.value) {
        break;
      }
      else if (node.value > current.value) {
        current = current.right;
      }
      else if (node.value < current.value) {
        current = current.left;
      }
      else if (current === null) {
        return "Node not found"
      }
      step += 1;
    }
    return step;
  }

  const isBalanced = () => {
    const leftBranch = root.left;
    const rightBranch = root.right;

    const leftHeight = height(leftBranch);
    const rightHeight = height(rightBranch);
    return Math.abs(leftHeight - rightHeight) <= 1
  }

  const rebalance = () => {
    const sortedArr = inOrder();
    root = buildTree(sortedArr);
  }

  return { getRoot, 
    insertNode, 
    deleteNode, 
    levelOrder, 
    preOrder, 
    inOrder, 
    postOrder,
    height,
    depth,
    find,
    isBalanced,
    rebalance,
   };
}

const arr = randomArr(10000, 13);
const bTree = tree(arr);
console.log(bTree.isBalanced());
console.log(bTree.inOrder());
console.log(bTree.preOrder());
console.log(bTree.postOrder());
console.log(bTree.levelOrder());
bTree.insertNode(102);
bTree.insertNode(103);
bTree.insertNode(104);
bTree.insertNode(105);
bTree.insertNode(101);
bTree.insertNode(110);
console.log(bTree.isBalanced());
bTree.rebalance()
console.log(bTree.isBalanced());
console.log(bTree.inOrder());
console.log(bTree.preOrder());
console.log(bTree.postOrder());
console.log(bTree.levelOrder());