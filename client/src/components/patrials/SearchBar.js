
function SearchBar(props) {

    const { parseInput } = props;

    function onChange(e) {
        console.log(e.target.value);
        parseInput(e.target.value);
    }

    return (
        <div className="flex flex-row space-x-4">
            <input onChange={onChange} className="basis-11/12 px-4 py-2 rounded border border-slate-400 focus:outline-none focus:ring focus:ring-slate-300" placeholder="Type something..." />
            <button className="rounded pointer basis-1/12 bg-indigo-500 shadow-lg text-blue-50 hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300">Go</button>
        </div>
    );
}

export default SearchBar;