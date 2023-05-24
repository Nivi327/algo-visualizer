export function binarySearch(arr, key) {
    const tempArr = new Array();
    for (let i = 0; i < arr.length; i++) {
        tempArr.push(arr[i]);
    }
    let animations = [];
    bs(tempArr, animations, key)
    return animations;
}

function bs(array, animations, key) {
    let i = 0
    let j = array.length - 1
    let flag = 0
    while (i <= j) {
        animations.push(["low1", i]);
        animations.push(["high1", j]);
        const mid = Math.floor((i + j) / 2);
        animations.push(["mid", mid]);
        if (array[mid] < key) {
            animations.push(["compare1", mid]);
            animations.push(["compare2", mid]);
            animations.push(["low2", i]);
            animations.push(["high2", j]);
            i = mid + 1
        } else if (array[mid] > key) {
            animations.push(["compare1", mid]);
            animations.push(["compare2", mid]);
            animations.push(["low2", i]);
            animations.push(["high2", j]);
            j = mid - 1;
        } else {
            flag = 1
            animations.push(["compare1", mid]);
            animations.push(["compare2", mid]);
            animations.push(["low2", i]);
            animations.push(["high2", j]);
            animations.push(["Found", mid]);
            break
        }
    }
    if (flag == 0) {
        animations.push(["Not Found", i]);
    }
}

binarySearch([1, 2, 3, 4, 5, 6, 7, 20, 22], 6);