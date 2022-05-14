import Card from "./Card";

function MainFieled(props) {
    function makeCard(v, i) {
        return (<Card colors={props.colors} card={v} lang={v.lang} value={v.value} object={v} key={i} />);
    }
    return (
        <div className="py-4 flex flex-col space-y-4">
            {props.cards.map(makeCard)}
        </div>
    );
}

export default MainFieled;
