import React from 'react';
import './Card.css';

import Img from '../assets/home/sorting.png';
import { Link } from 'react-router-dom';

const Card = ({heading, imgSrc, description, btnText}) => {
    return (
        <div className="home-card">
            <h2>{heading}</h2>
            <div className='home-img'>
                <img src={imgSrc} alt='image'/>
            </div>
            <div className='description btns'>
                <p style={{margin: 0, marginLeft: '2px'}}>{description}</p> <br />
                <Link className='btn-link' to='/sorting'>
                    <button>Play {btnText}</button>
                </Link>
            </div>
        </div>
    )
}

export default Card