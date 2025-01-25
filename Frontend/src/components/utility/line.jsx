export const Line = ({ h = 2, color = "black" }) => {
    return (
        <div className="w-full flex flex-row justify-center items-center gap-1">
            <span className={`w-1/6 inline-block h-[${h}px] rounded-2xl bg-${color}`}></span>
            <span className={`w-4/6 inline-block h-[1px] rounded-full bg-${color}`}></span>
            <span className={`w-1/6 inline-block h-[${h}px] rounded-2xl bg-${color}`}></span>
        </div>
    )
}