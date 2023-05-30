export function QucikSortAlgo(array) {
    let tempArr = array.slice();
    console.log(tempArr);
    let animations = [];
    quickSort(tempArr, 0, tempArr.length-1, animations);
    return animations;
}

function quickSort(array, left, right, animations) {
    if (left < right) {
        let pi = partition(array, left, right, animations);
        quickSort(array, left, pi - 1, animations);
        quickSort(array, pi+1, right, animations);
    }
}

function partition(array, left, right, animations) {
    let pivot = array[right];
    animations.push(["pivot1", right]);
    let i = left - 1;
    for (let j = left; j < right; j++) {
        animations.push(["compare1", j, right]);
        animations.push(["compare2", j, right]);
        if (array[j] <= pivot) {
            i += 1;
            animations.push(["swap1", i, array[j]]);
            animations.push(["swap2", j, array[i]]);
            swap(array, i, j);
        }
    }
    animations.push(["swap1", i + 1, array[right]]);
    animations.push(["swap2", right, array[i + 1]]);
    swap(array, i + 1, right);
    animations.push(["pivot2", right]);
    return i + 1;
}

function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

console.log(QucikSortAlgo([1, 2, 9, 8]));