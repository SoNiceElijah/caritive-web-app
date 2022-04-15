import Card from "./Card";

function MainFieled(props) {
    function makeCard(v, i) {
        return (<Card colors={props.colors} card={v} lang={v.lang} value={v.value} key={i} />);
    }
    return (
        <div className="main-card">
            {props.cards.map(makeCard)}
        </div>
    );
}

export default MainFieled;
