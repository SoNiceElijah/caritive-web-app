import Card from "./Card";

function MainFieled(props) {
    function makeCard(v, i) {
        return (<Card colors={props.colors} card={v} lang={v.lang} value={v.value} object={v} key={i} />);
    }
    function langCard(l, i) {
        return (
            <div className="first:ml-0 mt-2 ml-2 rounded-md bg-indigo-600 text-gray-50 px-2 py-1" key={`lang_key_${i}`}>{l[0]} - {l[1]}</div>
        );
    }
    const langs = Object.entries(props.cards.reduce((acc, i) => { acc[i.lang] = acc[i.lang] ? acc[i.lang] + 1 : 1 ; return acc }, {}));
    return (
        <div className="pt-4 flex flex-col space-y-4">
            <h3 >Языки</h3>
            <div className="flex flex-row flex-wrap">
                {langs.map(langCard)}
            </div>
            <h3>Каритивы</h3>
            <div className="py-4 flex flex-col space-y-4">
                {props.cards.map(makeCard)}
            </div>
        </div>
    );
}

export default MainFieled;
