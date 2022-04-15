import axios from 'axios';
import { useState } from 'react';
import Color from 'color';

function Card(props) {

    const [ loaded, setLoaded ] = useState(false);
    const [ data, loadData ] = useState(null);
    const [ state, setState ] = useState('hidden');

    function load() {
        if(!loaded) {
            axios
                .post(`/api/records/by_marker?marker_id=${props.card.id}`)
                .then((res) => {
                    loadData(res.data);
                });
            setLoaded(true);
        }
        if(state === 'hidden')
            setState('visible');
        else
            setState('hidden');
    }

    function record(rec, i) {
        let c = props.colors[rec.type];
        if(i % 2 === 0) {
            c = new Color(c).lighten(0.2).desaturate(0.1); 
        }
        return (
            <div key={`marker_${props.card.id}_rec_${i}`} style={{backgroundColor: c}} className='card-record'>
                <div className='card-record-param card-record-param-id'>{rec.param_id}</div>
                <div className='card-record-param card-record-value'>{rec.value}</div>
                <div className='card-record-param card-record-translation'>{rec.translation}</div>
                <div className='card-record-param card-record-example'>{rec.example}</div>
                <div className='card-record-param card-record-source'>{rec.source}</div>
                <div className='card-record-param card-record-note'>{rec.note}</div>
            </div>
        )
    }

    return (
        <div className="card">
            <div className="card-header" onClick={load}>
                <div className="card-lang">{props.lang}</div>
                <div className="card-value">{props.value}</div>
            </div>
                <div className={`card-body card-body-state-${state}`}>
                    {data ? data.map(record) : ""}
                </div>
        </div>
    );
}

export default Card;