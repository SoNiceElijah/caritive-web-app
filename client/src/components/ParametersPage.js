
function ParametersPage(props) {

    const { parameters } = props;

    function drawParam(param, i) {
        return (
            <div key={i} className='mt-4'>
                <div className='flex flex-row space-x-2'>
                    <div className='rounded-md bg-slate-200 p-2'>{param.id}</div>
                    <div className='rounded-md bg-slate-200 p-2 ml-2'>{param.name}</div>
                </div>
                <div className='parameter-body'>
                    {param.example ? (
                    <div className='parameter-example'>
                        <div className='mt-4 px-4 border-l-2 border-slate-300'>
                            {param.example}
                        </div>
                    </div>) : ""
                    }
                </div>
            </div>
        );
    }

    return (
        <div className={`parameter-page parameter-page-state-${props.state}`}>
            <h1 className='mt-4 font-bold '>Параметры</h1>
            <div className='parameters-list'>
                {parameters.map(drawParam)}
            </div>
        </div>
    );
}

export default ParametersPage;
