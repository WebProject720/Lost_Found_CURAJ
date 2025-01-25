export const Button=(props,ref)=>{
    return (
        <div>
            <input 
            className={props.className}
            type={props.type||'button'}
            ref={ref}
            >
                {props.children}
            </input>
        </div>
    )
}