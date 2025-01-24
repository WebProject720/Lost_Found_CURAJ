import { Link } from "react-router";


const Button_Link = ({ to, className,children }) => {
    return (
        <div>
            <Link to={to} className={`new-registration ${className}`}>
            {children}
            </Link>
        </div>
    )
}

export default  Button_Link;