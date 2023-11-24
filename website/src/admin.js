import { useState } from 'react'
import './App.css'

function Adminlogin(){
    const [nme,setNme]=useState("")
    const [pss,setPass]=useState("")
    const Login=()=>{
        if((nme.localeCompare("Admin")==0)&&(pss.localeCompare("123")==0)){
            window.location.href = `/Data`
        }
        else{
            alert("Incorrect password")
        }
    }
    return(
        <div className='login'>
            <input type='text' placeholder='Enter Name of the user'onChange={(e)=>{setNme(e.target.value)}} />
            <br></br>
            <input type='password' placeholder='Enter password' onChange={(e)=>{setPass(e.target.value)}} />
            <br></br>
            <button onClick={Login}>Submit</button>
        </div>
    )
}
export default Adminlogin
