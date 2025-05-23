import { useState } from "react"
import { Images } from "../../constants.astro";

export const Input = ({ BoxClassName = "", className = "", ...props }) => {
    const [eye, setEye] = useState(Images.eye_close);
    const [type, setType] = useState(props.type || 'text');

    const onEyeClick = () => {
        console.log('eye clicked');

        if (type == 'text') {
            setEye(Images.eye_close);
            setType('password');
        } else {
            setEye(Images.eye_open);
            setType('text');
        }
    }

    return (
        <div className={`flex flex-col gap-1 ${BoxClassName}`}>
            <label htmlFor={props.id} className={`font-extralight ${props.label ? '' : 'hidden'}`}>
                {props.label}
            </label>

            <div className="flex flex-row  group items-stretch w-full gap-0 flex-nowrap h-10 phone:h-9 ">
                <input
                    className={`bg-gray-100 border-gray-400 outline-none border-[1px] 
                    rounded-md p-2 
                    focus:bg-gray-100 focus:border-blue-800 focus:shadow-md focus:shadow-blue-200
                    transition-all duration-500 phone:p-1
                    disabled:bg-gray-300 disabled:hover:cursor-not-allowed
                     ${props.text ? 'w-4/6 rounded-r-none' : 'w-full'} 
                     ${props.type == "password" ? 'rounded-r-none' : 'w-full'} ${className || ''} 
                     `}
                    {...props}
                    type={type}
                    min={props.type == 'number' ? 1000 : null}
                    max={props.type == 'number' ? 9999 : null}
                />
                <div className={`rounded-r-md overflow-hidden border-l-0 border-gray-400 border-[1px] p-2 hover:cursor-not-allowed 
                bg-gray-200 flex justify-start items-center
                    text-gray-500 font-bold
                    ${props.text ? 'w-2/6' : 'hidden'}`}>
                    {props.text}
                </div>
                <div className={`rounded-r-md overflow-hidden border-l-0 border-gray-400 border-[1px] hover:cursor-pointer 
                bg-gray-200 flex items-center justify-center
                    text-gray-500 font-bold
                    ${props.type == "password" ? 'w-auto' : 'hidden'}`}>
                    <img onClick={onEyeClick} className="size-10 p-2 inline-block" src={eye}></img>
                </div>
            </div>
        </div>
    )
}