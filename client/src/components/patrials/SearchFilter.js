
const params = [
    "1a",
    "1b",
    "1c",
    "1d",
    "2a",
    "2b",
    "2c",
    "3a",
    "3b",
    "3c"
];

function SearchFilter(props) {

    function oneRecord(val, i) {
        return (
            <div key={i} className="record">
                <input id={`rec_${i}`} type="checkbox"></input>
                <label htmlFor={`rec_${i}`}><b>{val}</b></label>
                <select className="record-values">
                    <option>0</option>
                    <option>1</option>
                    <option>0?</option>
                    <option>1?</option>
                    <option>ND</option>
                    <option>IRR</option>
                </select>
            </div>
        );
    }

    return (
        <div className="search-filter">
            {params.map(oneRecord)}
        </div>
    );
}


export default SearchFilter;
