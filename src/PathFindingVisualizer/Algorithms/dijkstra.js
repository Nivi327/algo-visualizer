export function dijkstra(grid, startNode, endNode) {
    const visitedNodes = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);

    while(unvisitedNodes.length !== 0) {
        sortNodes(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();

        if(!closestNode.isWall) {
            if(closestNode.distance === Infinity) return visitedNodes;
            closestNode.isVisited = true;
            visitedNodes.push(closestNode);
            if(closestNode === endNode) return visitedNodes;
            updateUnvisitedNodes(closestNode, grid);
        }
    }
    return visitedNodes;
}

function updateUnvisitedNodes(node, grid) {
    const unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
    for(const neighbor of unvisitedNeighbours) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getUnvisitedNeighbours(node, grid) {
    const neighbors = [];
    const {row, col} = node;
    if(row > 0) {
        neighbors.push(grid[row-1][col]);
    }
    if(row < grid.length - 1) {
        neighbors.push(grid[row+1][col])
    }
    if(col > 0) {
        neighbors.push(grid[row][col-1])
    } 
    if(col < grid[0].length - 1) {
        neighbors.push(grid[row][col+1])
    }
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function sortNodes(nodes) {
    nodes.sort((node1, node2) => node1.distance - node2.distance);
}

function getAllNodes(grid) {
    const nodes = [];
    for(const row of grid) {
        for(const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

