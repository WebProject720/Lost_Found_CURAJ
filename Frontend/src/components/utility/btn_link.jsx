import { Link } from "react-router";


export const Button_Link = (props,ref) => {
    return (
        <div className="">
            <Link ref={ref} to={props.to} className={`new-registration ${props.className}`}>
                {props.children}
            </Link>
        </div>
    )
}
