import { ReactElement } from "react"

interface buttonProps{
    text :string ,
    type?:string,
    variant?:string,
    disabled?:boolean,
    icon?:ReactElement,
    sidebar?:boolean,
    onClick?:()=>void
}




const Button = ({text ,icon,variant,sidebar,disabled,onClick}:buttonProps) => {
  return ( 
        <button disabled={disabled} onClick={onClick} className={`${variant} ${sidebar && "gap-5 my-3 text-xl hover:bg-zinc-500"} w-full md:flex flex items-center cursor-pointer rounded-lg text-sm gap-2 px-4 `}>
            <div>{icon}</div>
            <div>{text}</div>
        </button>

  )
}

export default Button
