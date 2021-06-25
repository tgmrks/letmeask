import {  ButtonHTMLAttributes } from 'react'

import '../styles/button.scss'
            //passing a global element to buttonprops     + { some properts }
type ButtonPros = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean;
}; 
                                 //rest operator (everything that is not isOutlined falls in props)   
export function Button({ isOutlined = false, ...props}: ButtonPros) {
    return (
        <button 
            /*className="button" {...props}*/
            className={`button ${isOutlined ? 'outlined' : ''}`}
            {...props}
        /> //using spread operator
    )
}