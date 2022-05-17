
export default function SettingsPage(props) {

    const { makeAlias, makeParameters, makeAllParameters, clearParams } = props;

    function Setter(pr) {

        function Header() {
            return (
                <div className="text-center shadow-md py-2 bg-violet-500 border-l-[1px] rounded-lg text-gray-50 w-20 first:border-none border-slate-400">{pr.children}</div>
            )
        }

        function Btn(p) {
            const disabled = p.x ? (p.x.reduce((acc, i) => acc || props.aliases[i[0]][i[1]], false)) : false;
            return (
                <div> 
                    <input 
                        readOnly
                        className="hidden peer" 
                        id={`p_${pr.children}_${p.num}`} 
                        type="checkbox" 
                        checked={props.mergedParams[pr.line][1][p.btn]}
                        disabled={disabled}
                    />
                    <label 
                        htmlFor={`p_${pr.children}_${p.children}`} 
                        className="shadow-md block rounded peer-disabled:bg-gray-200 peer-disabled:text-gray-400 peer-disabled:cursor-default peer-checked:bg-slate-400 select-none cursor-pointer px-4 py-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300"
                        onClick={() => { if(!disabled) makeParameters(pr.line, p.btn) }}
                    >
                        {p.children}
                    </label>
                </div>
            );
        }

        return (
            <div className='flex flex-row space-x-4'>
                <Header />
                <Btn btn={0}>0</Btn>
                <Btn btn={1}>1</Btn>
                <Btn btn={2} x={[[0,0]]}>0?</Btn>
                <Btn btn={3} x={[[1,0]]}>1?</Btn>
                <Btn btn={4} x={[[0,1], [1,1]]}>IRR</Btn>
                <Btn btn={5} x={[[0,2], [1,2]]}>ND</Btn>
            </div>
        );
    }

    function ValButtons(pr) {

        function Header() {
            return (
                <div className="px-4 py-2 bg-slate-400 border-l-[1px] first:border-none border-slate-400">{pr.children}</div>
            )
        }

        function setBtn(e, i) {
            return (
                <div key={`al_${pr.children}_${i}_${e}`}> 
                    <input readOnly className="hidden peer" checked={pr.states[i]} id={`${pr.children}_${i}_${e}`} type="checkbox" />
                    <label htmlFor={`${pr.children}_${i}_${e}`} onClick={() => { makeAlias(`${pr.children}to${e}`); }} className="block peer-checked:bg-slate-400 select-none cursor-pointer px-4 py-2 border-l-[1px] border-slate-400 hover:bg-slate-200 active:bg-slate-300">
                        {e}
                    </label>
                </div>
            );
        }

        return (
            <div className="flex w-fit flex-row rounded-md border-[1px] border-slate-400 overflow-hidden">
                <Header />
                {pr.vals.map(setBtn)}
            </div>
        );
    }

    function renderParams(param, i) {
        return (<Setter line={i} key={`param_${i}`}>{param[0].id}</Setter>)
    }

    function BigBtn(p) {
        const disabled = p.x ? (p.x.reduce((acc, i) => acc || props.aliases[i[0]][i[1]], false)) : false;
        return (
            <div> 
                <input 
                    readOnly 
                    className="hidden peer" 
                    id={`bb_${p.children}`} 
                    disabled={disabled} 
                    checked={props.bbBtn[p.n]} 
                    type="checkbox" 
                />
                <label
                    htmlFor={`bb_${p.children}`} 
                    onClick={ () => { makeAllParameters(p.n); }} 
                    className="shadow-md block rounded peer-disabled:bg-gray-200 peer-disabled:text-gray-400 peer-disabled:cursor-default peer-checked:bg-slate-400 select-none cursor-pointer px-4 py-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300"
                >
                    {p.children}
                </label>
            </div>
        );
    }

    return (
        <div className="py-4">
            <div className="flex flex-col space-y-2">
                <ValButtons vals={['0?','IRR','ND']} states={props.aliases[0]}>0</ValButtons>
                <ValButtons vals={['1?','IRR','ND']} states={props.aliases[1]}>1</ValButtons>
            </div>
            <div className="mt-4 flex flex-row space-x-2">
                <BigBtn n={-1}>x</BigBtn>
                <BigBtn n={0}>0</BigBtn>
                <BigBtn n={1}>1</BigBtn>
                <BigBtn n={2} x={[[0,0]]}>0?</BigBtn>
                <BigBtn n={3} x={[[1,0]]}>1?</BigBtn>
                <BigBtn n={4} x={[[0,1], [1,1]]}>IRR</BigBtn>
                <BigBtn n={5} x={[[0,2], [1,2]]}>ND</BigBtn>
            </div>
            <div className="mt-2 flex flex-col space-y-2">
                {props.mergedParams.map(renderParams)}
            </div>
        </div>
    );
}