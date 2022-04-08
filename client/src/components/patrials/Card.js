
function Card(props) {
    return (
        <div className="card">
            <div className="card-lang">{props.lang}</div>
            <div className="card-value">{props.value}</div>
        </div>
    );
}

export default Card;