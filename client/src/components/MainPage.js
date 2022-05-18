import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchBar from './patrials/SearchBar';
import MainFieled from './patrials/MainFieled';
import StatusBar from './patrials/StatusBar';

import ParametersPage from './ParametersPage';
import LangsPage from './LangsPage';
import SettingsPage from './SettingsPage';

const base = [0];
function MainPage(props) {

    const [ cards, loadCards ] = useState([]);
    const [ page, setPage ] = useState(0);
    const [ alias, setAlias ] = useState([[false, false, false], [false, false, false]]);
    const [ parameters, loadParameters ] = useState([]);
    const [ parameterBar, setParameterBar ] = useState([]);
    const [ bbBtn, setBBBtn ] = useState([false, false, false, false, false]);
    const [ langs, loadLangs ] = useState([]);

    useEffect(() => {
        axios.post('/api/markers/get_by_params', { })
            .then((res) => { 
                loadCards(res.data.data);
             });
        axios.post('/api/parameters/get')
            .then((res) => { 
                loadParameters(res.data);
                const bar = [];
                for(const _p of res.data) {
                    bar.push([false, false, false, false, false]);
                }

                setParameterBar(bar);
        });
        axios.post('/api/languages/get')
            .then((res) => {
                loadLangs(res.data);
            })
    }, base);

    const mergedParams = [];
    for(let i = 0; i < parameters.length && i < parameterBar.length; ++i) {
        mergedParams.push([parameters[i], parameterBar[i]]);
    }

    function reload() {
        const params = {};

        const zero_like = ['0'];
        const one_like = ['1'];

        if(alias[0][0]) zero_like.push('0?');
        if(alias[0][1]) zero_like.push('IRR');
        if(alias[0][2]) zero_like.push('ND');

        if(alias[1][0]) one_like.push('1?');
        if(alias[1][1]) one_like.push('IRR');
        if(alias[1][2]) one_like.push('ND');

        for(const bar of mergedParams) {
            const line = [];
            if(bar[1][0]) for(const zero of zero_like) line.push(zero);
            if(bar[1][1]) for(const one of one_like) line.push(one);
            if(bar[1][2]) line.push('0?');
            if(bar[1][3]) line.push('1?');
            if(bar[1][4]) line.push('IRR');
            if(bar[1][5]) line.push('ND');
            if(line.length) params[bar[0].id] = line;
        }
        axios.post('/api/markers/get_by_params', params)
            .then((res) => { 
                loadCards(res.data.data);
             });
    }

    function BarButton(pr) {
        return (
            <button onClick={pr.onClick} className='w-full py-2 bg-gray-100 w-1.0 rounded-lg hover:bg-gray-200 active:text-white active:bg-gray-400'>{pr.children}</button>
        )
    }

    function makeAlias(type) {
        function disable(btn) {
            for(const bar of parameterBar) {
                bar[btn] = false;
            }

            bbBtn[btn] = false;
            setParameterBar([...parameterBar]);
            setBBBtn([...bbBtn]);
        }
        if(type === '0to0?') {
            alias[0][0] = !alias[0][0];
            disable(2);
        }
        if(type === '1to1?') {
            alias[1][0] = !alias[1][0];
            disable(3);
        }
        if(type === '0toIRR') {
            if(alias[0][1]) {
                alias[0][1] = false;
            } else {
                alias[1][1] = false;
                alias[0][1] = true;
            }
            disable(4);
        }
        if(type === '1toIRR') {
            if(alias[1][1]) {
                alias[1][1] = false;
            } else {
                alias[0][1] = false;
                alias[1][1] = true;
            }
            disable(4);
        }
        if(type === '0toND') {
            if(alias[0][2]) {
                alias[0][2] = false;
            } else {
                alias[1][2] = false;
                alias[0][2] = true;
            }
            disable(5);
        }
        if(type === '1toND') {
            if(alias[1][2]) {
                alias[1][2] = false;
            } else {
                alias[0][2] = false;
                alias[1][2] = true;
            }
            disable(5);
        }

        setAlias([...alias]);
        reload();
    }
    
    function makeParameters(line, btn) {
        parameterBar[line][btn] = !parameterBar[line][btn];

        let enabled = true;
        for(const bar of parameterBar) {
            enabled = enabled && bar[btn];
        }

        setParameterBar([...parameterBar]);
        bbBtn[btn] = enabled;
        setBBBtn([...bbBtn]);
        reload();
    } 

    function makeAllParameters(btn) {

        if(btn === -1) {
            const bar = [];
            for(const _p of parameterBar) {
                bar.push([false, false, false, false, false]);
            }
            
            setBBBtn([false, false, false, false, false]);
            setParameterBar(bar);
            return;
        }

        let enabled = true;
        for(const bar of parameterBar) {
            enabled = enabled && bar[btn];
        }
        for(const bar of parameterBar) {
            bar[btn] = !enabled;
        }
        bbBtn[btn] = !bbBtn[btn];

        setParameterBar([...parameterBar]);
        setBBBtn([...bbBtn]);
        reload();
    }

    const validVals = ['0', '1', '0?', '1?', 'IRR', 'ND'];
    function parseInput(text) {
        try {
            makeAllParameters(-1);
            const tokens = text.split(',').map(e => e.trim()).filter(e => e);
            for(const token of tokens) {
                const [ param, value ] = token.split('=');
                let line = -1;
                for(let i = 0; i < parameters.length; ++i) {
                    if(parameters[i].id == param) {
                        line = i;
                        break;
                    }
                }
                if(line == -1)
                    return;

                if(!validVals.includes(value))
                    return;

                const btn = validVals.indexOf(value);
                makeParameters(line, btn);
            }
        } catch(ex) {
            console.log(ex);
        }
    }

    return (
        <div>
            <div className='container mx-auto p-4'>
                <div className='serach-panel'>
                    <SearchBar parseInput={parseInput} />
                </div>
                <div>
                    <StatusBar 
                        alias={alias} 
                        makeAlias={makeAlias}

                        mergedParams={mergedParams}
                        makeParameters={makeParameters}
                    />
                </div>
                <div className='flex flex-row space-x-4'>
                    <div className='basis-2/12 pt-4 flex flex-col space-y-2'>
                        <BarButton onClick={() => { setPage(0); }}>Показатели</BarButton>
                        <BarButton onClick={() => { setPage(2); }}>Настройки</BarButton>
                        <BarButton onClick={() => { setPage(3); }}>Языки</BarButton>
                        <BarButton onClick={() => { setPage(1); }}>Параметры</BarButton>
                    </div>
                    <div className='basis-10/12'>
                        { 
                            page === 0 ? 
                                (<MainFieled cards={cards} />) 
                            : page === 1 ? 
                                (<ParametersPage parameters={parameters} />)
                            : page === 2 ?
                                (<SettingsPage 
                                    aliases={alias} 
                                    makeAlias={makeAlias} 

                                    mergedParams={mergedParams} 
                                    makeParameters={makeParameters} bbBtn={bbBtn}  
                                    makeAllParameters={makeAllParameters}
                                />)
                            : page === 3 ?
                                (<LangsPage langs={langs} />)
                            : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
