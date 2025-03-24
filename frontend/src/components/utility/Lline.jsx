export const Line = () => {
    return (
        <div className="w-full flex flex-row justify-center items-center gap-1">
            <span className={`w-1/6 inline-block h-[2px] rounded-2xl bg-black`}></span>
            <span className={`w-4/6 inline-block h-[1px] rounded-full bg-black`}></span>
            <span className={`w-1/6 inline-block h-[2px] rounded-2xl bg-black`}></span>
        </div>
    )
}