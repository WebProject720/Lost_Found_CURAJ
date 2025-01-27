export const Button = (props) => {
    return (
        <div>
            <button
                className={`bg-blue-800 rounded-[4px] px-4 py-2 text-white font-extrabold ${props.className}
                hover:bg-blue-700 hover:cursor-pointer
                transition-all duration-500`}
                {...props}
                
            >
                {props.children}
            </button>
        </div>
    )
}