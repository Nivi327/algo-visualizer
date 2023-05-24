export function linearSearch(arr, key){
    const tempArr = new Array();
    for(let i=0; i < arr.length; i++) {
        tempArr.push(arr[i]);
    }
    let animations = [];
    ls(tempArr, animations, key)
    return animations;
}

function ls(array, animations, key) {
    for(let i = 0; i < array.length; i++) {
        if(key != array[i]) {
            animations.push(["compare1", i]);
            animations.push(["compare2", i]);
        } else {
            animations.push(["compare1", i]);
            animations.push(["compare2", i]);
            animations.push(["equal", i]);
            break
        }
    }
}