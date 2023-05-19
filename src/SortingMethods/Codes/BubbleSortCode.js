import './Code.css';

const BubbleSortCode = () => {
    const lines = [
        {code:"n = len(arr)", indent: 0},
        {code:"for i in range(n-1):", indent: 0},
        {code:"for j in range(n-i-1):", indent: 1},
        {code:"if arr[j] > arr[j+1]:", indent: 2},
        {code:"arr[j], arr[j+1] = arr[j+1], arr[j]", indent: 3}
    ]
    return <>
    <h2 className='code-heading'>Bubble Sort Algotirhm Code</h2>
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