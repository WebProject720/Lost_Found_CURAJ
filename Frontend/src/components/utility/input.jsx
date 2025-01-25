export const Input = (props) => {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={props.id} className="font-bold">
                {props.label}
            </label>
            <input
                className={`bg-gray-100 border-black outline-none border-[2px] 
                    rounded-full p-2 
                    focus:bg-gray-200
                    transition-all duration-500
                     ${props.className}`}
                type={props.type}
                placeholder={props.placeholder}
                name={props.name}
                id={props.id}
            />
        </div>
    )
}