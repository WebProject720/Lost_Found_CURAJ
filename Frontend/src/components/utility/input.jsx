export const Input=(props,ref)=>{
    return(
        <div className="">
            <input 
            className={`${props.className}`} 
            type={props.type} 
            placeholder={props.placeholder}  
            name={props.name} 
            id={props.id} 
            ref={ref}
            />
        </div>
    )
}