import { forwardRef, useId } from "react"
import React  from 'react'

// seletion of state active or in active in posting 

export default forwardRef(
    function Select({
        className,
        options,
        label,
        ...props
    },ref) {
        const id = useId();

        return (
           <div className="w-full">
            {
                label && (<label htmlFor={id} className=""></label>)
            }
            <select 
            id={id}
            className = {`px-3 py-2 rounded-lg bg-white text-black outline-none
                 focus:bg-gray-50 duration-200 border border-gray-200 w-full${className}`}
            ref={ref}
            {...props}
            >
                {
                    options?.map((option) => (
                        <option
                        key={option}
                        value={option}>
                            {option}
                        </option>
                    ))
                }
            
            </select>
           </div>
        )
    }    
)
