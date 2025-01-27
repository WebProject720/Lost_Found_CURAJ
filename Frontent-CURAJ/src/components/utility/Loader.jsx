import React, { forwardRef } from "react"
export const Loader = forwardRef(({ className }, ref) => {
    return (
        <div className={`size-4 phone:size-6 bg-transparent border-t-0 border-[2px]
        animate-spin
         border-white p-1 rounded-full ${className}`} ref={ref} >
            <div className="bg-transparent w-full h-full rounded-full">
            </div>
        </div>
    )
})