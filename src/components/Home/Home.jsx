import React from 'react';
import './Home.css';
import Card from '../Card';

import sorting from '../../assets/home/sorting.png';
import searching from '../../assets/home/searching.png';
import pathfinding from '../../assets/home/pathfinding.png';
import linkedlist from '../../assets/home/linkedlist.png';
import primes from '../../assets/home/primes.png';


import { TypeAnimation } from 'react-type-animation';

const TYPING_SEQ = ['Sorting Algorithms', 'Searching Algortihms', 'Path Finding Algorithms', 'Linked List Operations', 'Sieve of Eratosthenes']

const SEQ_ARR = [];
const ANIMATION_TIME = 1000;

for(let i=0; i < TYPING_SEQ.length; i++) {
    SEQ_ARR.push(TYPING_SEQ[i]);
    SEQ_ARR.push(ANIMATION_TIME);
}

const CARD_DETAILS = [
    {
        heading: 'Sorting Algorithms',
        imgSrc: sorting,
        description: 'Sorting the array of items with required speed and acquire patterns.Set of algorithm which will be used for sorting is Bubble sort, Insertion Sort, Selection Sort, Merge sort, Quick sort.',
        btnText: "Sorting Algo's"
    },
    {
        heading: 'Searching Algorithms',
        imgSrc: searching,
        description: 'Searching the array of items for the required search key value in the random array of different sizes. The algorithms used are Linear Search and Binary Search.',
        btnText: "Searching Algo's"
    },
    {
        heading: 'PathFinding Algorithms',
        imgSrc: pathfinding,
        description: "A pathfinding algorithm seeks to find the shortest path between two points.Some of the algorithms are BFS, DFS and Dijkstra’s algorithm.",
        btnText: "PathFinding Algo's"
    },
    {
        heading: 'LinkedList Operations',
        imgSrc: linkedlist,
        description: 'Linked List is a datastructure which has a lot of applications related to memory allocation. Set of operations performed are Insertion, Deletion, Updating, Reversing.',
        btnText: "LinkedList Ops"
    },
    {
        heading: 'Primes',
        imgSrc: primes,
        description: 'Seieve Of Eratosthenes is one of the most efficient ways of finding all primes that are less than a value n especially when the input is very large.',
        btnText: "Seieve Of Eratosthenes"
    },
]

const Home = () => {
  return (
    <div className="home">
        <div className="welcome-message">
            welcome to algorithm visualizer
        </div>
        <div className="objective">
            Algorithm Visualizer, the fastest and the best way to understand algorithms.
        </div>
        <div className='typing-animation'>
            <span style={{fontSize: '2rem', display: 'inline-block', color: 'white'}}>Enjoy Your Learning With </span> <TypeAnimation 
            sequence={SEQ_ARR}
            wrapper='span'
            speed={50}
            style={{fontSize: '2rem', display: 'inline-block', color: 'white'}}
            repeat={Infinity}
            />
        </div>
        <div className="routing-cards">
            {CARD_DETAILS.map((card) => {
                return <Card 
                heading={card.heading}
                imgSrc={card.imgSrc}
                description={card.description}
                btnText={card.btnText}
                />
            })}
        </div>
    </div>
  )
}

export default Home