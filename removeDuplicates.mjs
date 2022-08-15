function removeDuplicates(arr) {
  return arr.reduce((acc, el) => {
    if (!acc.includes(el)) {
      return acc.concat(el);
    }
    return acc;
  }, []);
}

export default removeDuplicates;
