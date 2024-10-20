import React from 'react'

interface InputProps {
    id:string;
    onChange:any;
    value:string;
    label:string;
    type?:string;
}

const input:React.FC<InputProps> = ({id,label,onChange,value,type}) => {
  return (
    <div className='relative' >
        <input
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        className='block rounded-xl px-7 pt-6 pb-1 w-full text-base text-white bg-neutral-600 focus:outline-none focus:ring-0 peer'
        />
        <label htmlFor={id} 
        className='
        text-base 
        absolute 
        scale-75
        z-10 
        left-7
        top-3
        origin-0
        text-zinc-400
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-1
        peer-focus:scale-75 
        peer-focus:-translate-y-3
        duration-150
        transform' >{label}</label>
       
    </div>
  )
}

export default input