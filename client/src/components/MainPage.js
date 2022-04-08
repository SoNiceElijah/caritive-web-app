import React, { useState } from 'react';
import SearchFilter from './patrials/SearchFilter';
import SearchBar from './patrials/SearchBar';
import MainFieled from './patrials/MainFieled';

import ParametersPage from './ParametersPage';

const cards = [
    { lang : "english", value : "not" },
    { lang : "english", value : "not2" },
    { lang : "russian", value : "без" },
    { lang : "russian", value : "не без" },
]

function MainPage(props) {

    return (
        <div>
            <div className='main-page'>
                <div className='serach-panel'>
                    <SearchBar />
                </div>
                <div className='filter-panel'>
                    <SearchFilter />
                </div>
                <div className='result-main-field'>
                    <MainFieled cards={cards} />
                </div>
            </div>
            <ParametersPage />
        </div>
    );
}

export default MainPage;
