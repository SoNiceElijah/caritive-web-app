
import axios from 'axios';
import { useEffect, useState } from 'react';

function ParametersPage(props) {

    const [ parameters, setParameters ] = useState([ ]);
    useEffect(() => {
       axios.post('/api/parameters/get')
            .then((res) => { 
                console.log(res.data);
                setParameters(res.data);
             });
    }, [0]);

    const colors = {};

    for(const p of parameters) {
        colors[p.type] = '#' + Math.floor(Math.random() * (2 ** 24)).toString(16).padStart('0',6);
    }

    function drawParam(param, i) {
        return (
            <div key={i} className='parameter'>
                <div className='parameter-header'>
                    <span style={{ backgroundColor : colors[param.type]}} className='parameter-header-color'></span>
                    <span className='parameter-header-id'>{param.id}</span>
                    <span className='parameter-header-name'>{param.name}</span>
                </div>
                <div className='parameter-body'>
                    {param.example ? (
                    <div className='parameter-example'>
                        <div className='parameter-example-content'>
                            {param.example}
                        </div>
                    </div>) : ""
                    }
                </div>
            </div>
        );
    }

    return (
        <div className='parameter-page'>
            <h1>Параметры</h1>
            <div className='parameters-list'>
                {parameters.map(drawParam)}
            </div>
        </div>
    );
}

export default ParametersPage;
