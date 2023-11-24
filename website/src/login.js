import { useState } from "react"
import axios from "axios"
function Login(){
    const [email,setEmail]=useState("")
    const [pss,setPss]=useState("")
    const login=()=>{
        localStorage.setItem("email",email)
        axios.post('http://localhost:3500/Login',
        {
            email,
            pss
        }).then((data)=>{
            if(data.data.status==='fail'){
                alert("Invalid information");
            }else{
                window.location.href = `/Mainpage`
            }
        })
    }
    return(
        <>
        <div className="lgin">
            <input type="email" required placeholder="Enter mail Id" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            <input type="password" required placeholder="Enter password" value={pss} onChange={(e)=>{setPss(e.target.value)}} />
            <button onClick={login}>Login</button>
        </div>
        </>
    )
}
export default Login