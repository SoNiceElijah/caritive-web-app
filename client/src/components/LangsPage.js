
export default function LangsPage(props) {
    const { langs } = props;

    function createCard(v, i) {
        console.log(v);
        return (
            <div 
                key={`lang_card_${i}`} 
                className="rounded-md w-full py-2 px-4 bg-slate-100 cursor-pointer select-none hover:bg-slate-200 flex flex-row"
            >
                <div className="px-4">{v.count_1} </div>
                <div className="">{v.lang}</div>
            </div>
        )
    }

    return (
        <div className="space-y-2 flex flex-col p-4">{langs.map(createCard)}</div>
    );
}