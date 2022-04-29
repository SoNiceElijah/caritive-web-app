import { useState } from 'react';
import axios from 'axios';
import './test_req.css';

const BASE = "/api/";
function TestRequests(props) {

    const [resp, setResp] = useState("");

    function makeRequest() {
        const input = document.getElementById('reqeust');
        const value = input.value;
        const url = `${BASE}${value}`;

        const textarea = document.getElementById('body');
        const bvalue = textarea.value;

        let body = {};
        try {
            body = JSON.parse(bvalue);
        } catch {}
        axios.post(url, body)
            .then(res => {
                console.log(res);
                try {
                    const obj = JSON.stringify(res.data, null, 4);
                    setResp(obj);
                } catch {
                    setResp(res.data.toString());
                }
            })
            .catch(res => {
                console.log(res);
                alert("Запрос сломался :(");
            })
    }

    return (
        <div className="center">
            <div className="query-input">
                <div className="localhost">http://localhost:5000/api/</div>
                <input id="reqeust" type="text" />
                <button onClick={makeRequest}>Send</button>
            </div>
            <div className="request-body">
                <h2>Body</h2>
                <textarea id="body"></textarea>
            </div>
            <div className="response-body">
                <h2>Response</h2>
                <div className='body'>
                    <pre>
                        <code>
                            {resp}  
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
}

export default TestRequests;
