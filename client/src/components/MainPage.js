import React, { useState } from 'react'

function MainPage(props) {
    
    // before logic
    const [idx, setIdx] = useState(0);

    function onCick(event) {
        setIdx(idx + 1);
    }

    return (
        <div>
            <div className='idx-counter'>{idx}</div>
            <button onClick={onCick}>+1</button>
        </div>
    );
}

export default MainPage;
