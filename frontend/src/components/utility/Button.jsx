export const Button = ({ className, ...props }) => {
    return (
        <div>
            <button
                className={`bg-blue-800 rounded-[4px] px-4 phone:px-2 phone:py-1 py-2 text-white font-extrabold 
                hover:bg-blue-700 hover:cursor-pointer
                transition-all duration-500
                 disabled:bg-gray-300 disabled:hover:cursor-not-allowed ${className}`}
                {...props}

            >
                {props.children}
            </button>
        </div>
    )
}