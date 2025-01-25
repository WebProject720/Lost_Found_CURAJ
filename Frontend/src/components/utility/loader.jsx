export const Loader = (props) => {
    return (
        <div className="flex justify-between items-center gap-1 flex-col flex-nowrap">
            <div className="size-8 bg-transparent border-l-0 border-r-0  border-black border-2 rounded-full
        transition-all rotate-180 ">
                <div className="">

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