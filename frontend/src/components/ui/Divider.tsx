import React from 'react'

type Prop ={
    headerText:string;
}
const Divider:React.FC<Prop> = (props:Prop) => {
  return (
  <div className="divider  w-screen text-lg text-white my-20">{props.headerText}</div>
  )
}

export default Divider