// import React from 'react';

// import TreeNode from './TreeAlgorithms/TreeNode';

// const NODE_HEIGHT = 80;
// const NODE_WIDTH = 80;
// var Tree_Data = [1, 3, 4, 5, 6 ,7, null];

// const TreeVisualizer = () => {
//     var location = {
//         x: window.innerWidth/2,
//         y: NODE_HEIGHT/2 + 20,
//     };

//     const createCanvas = () => {
//         const canvas = document.getElementById("canvas");
//         ctx = canvas.getContext("2d");
//         canvas.width = window.innerWidth * 0.75;
//         canvas.height = window.innerHeight * 0.75;
//         canvas.style.position = "fixed"
//         canvas.style.top = '5rem';
//         ctx.fillStyle = "transparent";
//         ctx.fillRect(0, 0, canvas.width, canvas.height);

//         var height = Math.log2(Tree_Data.length);
//         var rootNode = new TreeNode(Tree_Data[0], location, height, 2);
//     };

//     return (
//         <canvas id="canvas">

//         </canvas>
//     )
// }

// export default TreeVisualizer