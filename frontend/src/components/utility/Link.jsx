export const Link = ({ ...props }) => {

    return (
        <div className="p-2 tablet:w-full">
            <a href={props.href} className="hover:bg-gray-300  font-normal flex gap-1 items-center flex-row rounded-md p-2
            transition-all tablet:bg-gray-100 text-nowrap tablet:active:bg-gray-300 tablet:w-full duration-500 ease-linear">
                {
                    props.icon ?
                        <img
                            src={props.icon}
                            alt={props.name}
                            className="size-5"
                        /> : null
                }
                {props.children}
            </a>
        </div>
    )
}