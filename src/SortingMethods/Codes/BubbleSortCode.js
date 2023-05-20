import './Code.css';

import Codes from './../codes.json';

const BubbleSortCode = ({code, name}) => {
    const lines = Codes[code];
    return <>
    <h2 className='code-heading'>{name} Algotirhm Code</h2>
    <div className='outer-container'>
    <div className="container">
        {lines.map((line, idx) => {
            return <code className="code" key={idx} style={{marginLeft: `${1.5*line.indent}rem`}}>{line.code}<br /></code>
        }
        )}
    </div>
    </div>
    </>
};

export default BubbleSortCode;