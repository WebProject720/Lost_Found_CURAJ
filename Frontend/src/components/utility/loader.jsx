export const Loader = (props) => {
    return (
        <div className="flex justify-between items-center gap-1 flex-col flex-nowrap">
            <div className="size-12 bg-transparent border-l-0 border-r-0  border-black  rounded-full
        border-0">
                <div className="size-full flex bg-blue-600 rounded-full justify-center items-center">
                    <div className="size-2/3 bg-blue-400 flex rounded-full justify-center items-center">
                        <div className="size-2/3 bg-blue-300 rounded-full flex justify-center items-center">
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p>
                    {props.children}
                </p>
            </div>
        </div>
    )
}