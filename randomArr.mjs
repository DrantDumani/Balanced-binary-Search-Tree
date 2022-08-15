function randomArr(numRange, length) {
    const arr = []
    for (let i = 0; i < length; i += 1) {
        const elem = Math.floor(Math.random() * numRange);
        arr.push(elem)
    }
    return arr;
}

export default randomArr;