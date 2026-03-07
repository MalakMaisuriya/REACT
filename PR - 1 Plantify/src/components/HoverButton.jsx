import { useState } from "react"

function HoverButton({ text }) {

const [hover,setHover] = useState(false)

const style = {
backgroundColor: hover ? "#1f5f46" : "#2f7d5b",
color:"white",
border:"none",
padding:"10px 22px",
borderRadius:"30px",
cursor:"pointer",
fontWeight:"500",
letterSpacing:"0.5px",
boxShadow: hover
? "0 6px 15px rgba(0,0,0,0.2)"
: "0 4px 10px rgba(0,0,0,0.1)",
transform: hover ? "translateY(-2px)" : "translateY(0)",
transition:"all 0.3s ease"
}

return(

<button
style={style}
onMouseEnter={()=>setHover(true)}
onMouseLeave={()=>setHover(false)}
>

{text}

</button>

)

}

export default HoverButton