
export default function StatusBar(props) {

    const { makeAlias, makeParameters } = props;

    function AliasLabel(pr) {
        return (<div onClick={pr.onClick} className=" mt-2 ml-2 select-none cursor-pointer hover:bg-indigo-600 px-2 py-[2px] rounded-xl text-gray-50 bg-indigo-500 text-xs">{pr.children}</div>);
    }

    function ParamLabel(pr) {
        return (<div onClick={pr.onClick} className="mt-2 ml-2 select-none cursor-pointer hover:bg-orange-600 px-2 py-[2px] rounded-xl text-gray-50 bg-orange-500 text-xs">{pr.children}</div>);
    }

    function mapAliases() {
        return (
            <div className="flex flex-row flex-wrap space-x-2">
                { props.alias[0][0] ? <AliasLabel onClick={() => { console.log("fsdfsdf"); makeAlias("0to0?"); }}>0 = 0?</AliasLabel> : "" }
                { props.alias[0][1] ? <AliasLabel onClick={() => { makeAlias("0toIRR"); }}>0 = IRR</AliasLabel> : "" }
                { props.alias[0][2] ? <AliasLabel onClick={() => { makeAlias("0toND"); }}>0 = ND</AliasLabel> : "" }

                { props.alias[1][0] ? <AliasLabel onClick={() => { makeAlias("1to1?"); }}>1 = 1?</AliasLabel> : "" }
                { props.alias[1][1] ? <AliasLabel onClick={() => { makeAlias("1toIRR"); }}>1 = IRR</AliasLabel> : "" }
                { props.alias[1][2] ? <AliasLabel onClick={() => { makeAlias("1toND"); }}>1 = ND</AliasLabel> : "" }
            </div>
        );
    }

    function mapParameters() {

        function param(p, i) {
            return (
                <ParamLabel key={`param_label_${i}`} onClick={p.action}>{p.name}</ParamLabel>
            );
        }

        function filter(item, line) {
            const res = [];
            if(item[1][0]) {
                res.push({ name : `${item[0].id} = 0`, action : () => { makeParameters(line, 0); } })
            }
            if(item[1][1]) {
                res.push({ name : `${item[0].id} = 1`, action : () => { makeParameters(line, 1); } })
            }
            if(item[1][2]) {
                res.push({ name : `${item[0].id} = 0?`, action : () => { makeParameters(line, 2); } })
            }
            if(item[1][3]) {
                res.push({ name : `${item[0].id} = 1?`, action : () => { makeParameters(line, 3); } })
            }
            if(item[1][4]) {
                res.push({ name : `${item[0].id} = IRR`, action : () => { makeParameters(line, 4); } })
            }
            if(item[1][5]) {
                res.push({ name : `${item[0].id} = ND`, action : () => { makeParameters(line, 5); } })
            }

            return res;
        }

        return (
            <div className="flex flex-row flex-wrap">
                {props.mergedParams.flatMap(filter).map(param)}
            </div>
        );
    }

    return (<div className="py-2 flex flex-col space-y-2">{mapAliases()}{mapParameters()}</div>);
}