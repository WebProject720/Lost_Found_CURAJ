export const LoaderCircle = (props) => {
    return (
        <div className="flex justify-center items-center">
            <svg class="mr-3 size-5 animate-spin bg-blue-800" viewBox="0 0 24 24">
            </svg>
            <p className="text-center">
                {props.children}
            </p>
        </div>
    )
}