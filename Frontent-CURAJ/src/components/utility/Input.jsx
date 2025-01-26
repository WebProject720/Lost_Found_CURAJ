export const Input = (props) => {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={props.id} className="font-bold">
                {props.label}
            </label>
            <div className="flex flex-row group w-full gap-0 flex-nowrap items-center ">
                <input
                    className={`bg-gray-100 border-gray-400 outline-none border-[2px] 
                    rounded-full p-2  
                    focus:bg-gray-200 focus:border-blue-800 focus:shadow-md focus:shadow-blue-200
                    transition-all duration-500 
                     ${props.className} ${props.text ? 'w-4/6 rounded-r-none' : 'w-full'}`}
                    type={props.type}
                    placeholder={props.placeholder}
                    name={props.name}
                    id={props.id}
                />
                <div className={`rounded-r-full border-l-0 border-gray-400 border-[2px] p-2 hover:cursor-not-allowed 
                bg-gray-200
                    text-gray-500 font-bold
                    ${props.text ? 'w-2/6' : 'hidden'}`}>
                    {props.text}
                </div>
            </div>
        </div>
    )
}