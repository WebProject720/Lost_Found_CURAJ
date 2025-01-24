export const Button=({value,classes,type="Button"})=>{
    return (
        <div>
            <input type={type} className={`login-button text-center ${classes} `} value={value} />
        </div>
    )
}