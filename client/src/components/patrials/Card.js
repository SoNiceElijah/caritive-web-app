import axios from 'axios';
import { useState } from 'react';

function Card(props) {

    const [ loaded, setLoaded ] = useState(false);
    const [ data, loadData ] = useState(null);
    const [ state, setState ] = useState('0');
    const [ showMode, changeShowMode ] = useState(0);

    function load() {
        if(!loaded) {
            axios
                .post(`/api/records/by_marker?marker_id=${props.card.id}`)
                .then((res) => {
                    loadData(res.data);
                    setState('fit');
                });
            setLoaded(true);
            return;
        }
        if(state === '0')
            setState('fit');
        else
            setState('0');
    }

    function record(rec, i) {
        return (
            <div key={`marker_${props.card.id}_rec_${i}`} className='flex flex-row space-x-4 even:bg-slate-100 odd:bg-slate-200 p-2'>
                <div className='basis-8 text-center'>{rec.param_id}</div>
                <div className='basis-8 text-center'>{rec.value}</div>
                <div className='flex-1'>{rec.translation}</div>
                <div className='flex-1'>{rec.example}</div>
                <div className='basis-32'>{rec.source}</div>
                <div className='flex-1'>{rec.note}</div>
            </div>
        )
    };

    function line(rec, i) {
        return (
            <div key={`marker_${props.card.id}_line_${i}`} className='flex flex-row flex-wrap'>
                { rec.map(cell) }
            </div>
        );
    }

    function cell(rec, i) {
        return (
            <div key={`marker_${props.card.id}_cell_${i}`} className='basis-16'>
                <div className='p-2 text-center bg-slate-300'>{rec.param_id}</div>
                <div className='p-2 text-center bg-slate-100 '>{rec.value}</div>
            </div>
        )
    }

    function SwitchButton(pr) {
        return (
                <button onClick={pr.onClick} className='flex-1 rounded bg-gray-300 shadow-lg text-gray-700 hover:bg-gray-400 active:bg-gray-500 outline-none"'>
                    {pr.name}
                </button>
            );
    }

    function filter(item) {
        if(showMode === 0) {
            return true;
        }
        if(showMode === 1) {
            if(item.value === '0') {
                return true;
            } else {
                return false;
            }
        }
        if(showMode === 2) {
            if(item.value === '1') {
                return true;
            } else {
                return false;
            }
        }
        if(showMode === 3) {
            if(item.value === '0?') {
                return true;
            } else {
                return false;
            }
        }
        if(showMode === 4) {
            if(item.value === '1?') {
                return true;
            } else {
                return false;
            }
        }
        if(showMode === 5) {
            if(item.value === 'IRR') {
                return true;
            } else {
                return false;
            }
        }
        if(showMode === 6) {
            if(item.value === 'ND') {
                return true;
            } else {
                return false;
            }
        }
    }

    const types = [];
    if(data) {
        const dict = data.reduce((acc, e) => {
            if(!acc[e.type]) acc[e.type] = [];
            acc[e.type].push(e);
            return acc;
        }, {});
        for(const key in dict) {
            types.push(dict[key]);
        }
    }

    return (
        <div className=''>
            <div className="flex space-x-2 cursor-pointer bg-gray-100 rounded-md shadow-md" onClick={load}>
                <div className="font-light text-center basis-1/12 rounded-l-md px-2 my-2 border-r-[1px] border-gray-300">{props.lang}</div>
                <div className="py-2 px-4 basis-11/12" >{props.value}</div>
            </div>
            <div className='hidden h-0'></div>
            <div className='hidden h-fit'></div>
            <div className={`overflow-hidden h-${state} `}>
                <div className='my-4 px-4 border-l-[1px] border-slate-300'>
                    <h1 className='text-2xl font-bold mt-5'>{props.object.value}</h1>
                    <h3 className='text-gray-700 '>{props.object.lang}</h3>
                    <p className='mt-5'>{props.object.translation}</p>
                    <p className='mt-5'>{props.object.note}</p>
                    <p className='mt-5'>{props.object.source}</p>
                    <div className='mt-5 bg-gray-100 rounded p-2 flex flex-row space-x-2 max-w-md'>
                        <SwitchButton onClick={() => { changeShowMode(0); }} name="Все" />
                        <SwitchButton onClick={() => { changeShowMode(1); }} name="0" />
                        <SwitchButton onClick={() => { changeShowMode(2); }} name="1" />
                        <SwitchButton onClick={() => { changeShowMode(3); }} name="0?" />
                        <SwitchButton onClick={() => { changeShowMode(4); }} name="1?" />
                        <SwitchButton onClick={() => { changeShowMode(5); }} name="IRR" />
                        <SwitchButton onClick={() => { changeShowMode(6); }} name="ND" />
                    </div>
                    <div className='flex flex-row flex-wrap mt-6'>
                        {data ? data.filter(filter).map(cell) : ""}
                    </div>
                    <h4 className='mt-5 font-bold'>Подробнее</h4>
                    <div className="mt-3 flex flex-col">
                        {data ? data.filter(filter).map(record) : ""}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;