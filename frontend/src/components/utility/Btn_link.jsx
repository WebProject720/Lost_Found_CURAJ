// import { Link } from "react-router";


export const Button_Link = (props) => {
    return (
        <div className="">
            {/* <Link to={props.to} className={`bg-blue-800 rounded-[4px] px-4 py-2 text-white font-extrabold ${props.className}
                hover:bg-blue-700 hover:cursor-pointer
                transition-all duration-500`}>
                {props.children}
            </Link> */}
            <a href={props.to} className={`bg-blue-800 rounded-[5px] px-4 py-2 text-white font-extrabold 
                hover:bg-blue-700 hover:cursor-pointer
                transition-all duration-500 ${props.className}`}>
                {props.children}
            </a>
        </div>
    )
}
