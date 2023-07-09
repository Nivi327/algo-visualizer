export function dfsn4(grid, startNode, endNode) {
    let visitedNodes = [];
    let stack = [];
    stack.push(startNode);
    while (stack.length) {
        const curNode = stack.pop();

        if (curNode === endNode) {
            return visitedNodes;
        }

        if (!curNode.isWall && (curNode.isStart || !curNode.isVisited)) {
            curNode.isVisited = true;
            visitedNodes.push(curNode);
            const { row, col } = curNode;
            let nxtNode;
            if (row > 0) {
                nxtNode = grid[row - 1][col];
                if (!nxtNode.isVisited) {
                    nxtNode.previousNode = curNode;
                    stack.push(nxtNode);
                }
            } if (row < grid.length - 1) {
                nxtNode = grid[row + 1][col];
                if (!nxtNode.isVisited) {
                    nxtNode.previousNode = curNode;
                    stack.push(nxtNode);
                }
            }
            if (col > 0) {
                nxtNode = grid[row][col - 1];
                if (!nxtNode.isVisited) {
                    nxtNode.previousNode = curNode;
                    stack.push(nxtNode);
                }
            } if (col < grid[0].length - 1) {
                nxtNode = grid[row][col + 1];
                if (!nxtNode.isVisited) {
                    nxtNode.previousNode = curNode;
                    stack.push(nxtNode);
                }
            }
        }
    }
    return visitedNodes;
}