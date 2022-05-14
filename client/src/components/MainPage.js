import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchFilter from './patrials/SearchFilter';
import SearchBar from './patrials/SearchBar';
import MainFieled from './patrials/MainFieled';
import ParametersPage from './ParametersPage';

const base = [0];
function MainPage(props) {

    const [ cards, loadCards ] = useState([]);
    const [ paramsState, changeParams ] = useState("init");
    const [ colors, setColors ] = useState({ });

    useEffect(() => {
        axios.post('/api/markers/get')
            .then((res) => { 
                loadCards(res.data);
             });
    }, base);

    function clickParams() {
        if(paramsState === 'hidden' || paramsState === 'init')
            changeParams("visible");
        else
            changeParams("hidden");
    }

    return (
        <div>
            <div className='container mx-auto p-4'>
                <div className='serach-panel'>
                    <SearchBar />
                </div>
                <div className='result-main-field'>
                    <MainFieled colors={colors} cards={cards} />
                </div>
            </div>
            <ParametersPage colors={colors} setColors={setColors} state={paramsState} anchor={base} />
        </div>
    );
}

export default MainPage;
