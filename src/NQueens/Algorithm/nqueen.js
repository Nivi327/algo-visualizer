export function nqueensalgo(n) {
    let grid = [];
    for (let i = 0; i < n; i++) {
        let temp = [];
        for (let j = 0; j < n; j++) {
            temp.push('.');
        }
        grid.push(temp);
    }
    let ans = [];
    let animations = [];
    solve(grid, ans, 0, 0, n, animations);
    console.log(animations);
    return animations
}

function solve(grid, ans, i, j, n, animations) {
    if (j === n) {
        animations.push(['finish', i, j]);
        addAnswer(grid, ans, n)
        return
    }
    for (let k = 0; k < n; k++) {
        if (isSafe(grid, k, j, n, animations)) {
            animations.push(['p-queen', i, j]);
            grid[k][j] = 'Q';
            solve(grid, ans, k, j + 1, n, animations);
            animations.push(['r-queen', i, j]);
            grid[k][j] = '.';
        }
    }
}

function isSafe(grid, i, j, n, animations) {
    animations.push(['pos1', i, j]);
    for (let k = i - 1; k >= 0; k--) {
        animations.push(['check1', k, j]);
        animations.push(['check2', k, j]);
        if (grid[k][j] === 'Q') {
            animations.push(['exists1', k, j]);
            animations.push(['exists2', k, j]);
            return false
        }
    }
    for (let k = i + 1; k < n; k++) {
        animations.push(['check2', k, j]);
        animations.push(['check1', k, j]);
        if (grid[k][j] === 'Q') {
            animations.push(['exists1', k, j]);
            animations.push(['exists2', k, j]);
            return false
        }
    }
    for (let k = j - 1; k >= 0; k--) {
        animations.push(['check1', i, k]);
        animations.push(['check2', i, k]);
        if (grid[i][k] === 'Q') {
            animations.push(['exists1', i, k]);
            animations.push(['exists2', i, k]);
            return false
        }
    }
    for (let k = j + 1; k < n; k++) {
        animations.push(['check1', i, k]);
        animations.push(['check2', i, k]);
        if (grid[i][k] === 'Q') {
            animations.push(['exists1', i, k]);
            animations.push(['exists2', i, k]);
            return false
        }
    }
    const M = i;
    const N = j;
    i-=1
    j-=1
    while (i >= 0 && j >= 0) {
        animations.push(['check1', i, j]);
        animations.push(['check2', i, j]);
        if (grid[i][j] === 'Q') {
            animations.push(['exists1', i, j]);
            animations.push(['exists2', i, j]);
            return false
        }
        i -= 1
        j -= 1
    }
    i = M
    j = N
    i+=1
    j += 1
    while (i < n && j < n) {
        animations.push(['check1', i, j]);
        animations.push(['check2', i, j]);
        if (grid[i][j] === 'Q') {
            animations.push(['exists1', i, j]);
            animations.push(['exists2', i, j]);
            return false
        }
        i += 1
        j += 1
    }
    i = M
    j = N
    i-=1
    j+=1
    while (i >= 0 && j < n) {
        animations.push(['check1', i, j]);
        animations.push(['check2', i, j]);
        if (grid[i][j] === 'Q') {
            animations.push(['exists1', i, j]);
            animations.push(['exists2', i, j]);
            return false
        }
        i -= 1
        j += 1
    }
    i = M
    j = N
    i += 1
    j -= 1
    while (i < n && j >= 0) {
        animations.push(['check1', i, j]);
        animations.push(['check2', i, j]);
        if (grid[i][j] === 'Q') {
            animations.push(['exists1', i, j]);
            animations.push(['exists2', i, j]);
            return false
        }
        i += 1
        j -= 1
    }
    animations.push(['pos2', M, N]);
    return true
}

function addAnswer(grid, ans, n) {
    let temp = []
    for (let i = 0; i < n; i++) {
        let t = []
        for (let j = 0; j < n; j++) {
            t.push(grid[i][j]);
        }
        temp.push(t);
    }
    ans.push(temp);
}