import { useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'
function Register(){
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [pss,setPss]=useState("")
    const google=(google)=>{
        const n=google.name,e=google.email,p="google"
        axios.post('http://localhost:3500/google',
        {
            n,
            e,
            p
        }
      )
      .then((data)=>{
        if(data.data.status==='ok' || data.data.status==='continue'){
            localStorage.setItem("email",e)
            window.location.href = `/Mainpage`
          }else{
             alert("Invalid information");
          }
    })
    }
    const Register=()=>{
        axios.post('http://localhost:3500/Register',
        {
            name,
            email,
            pss,
        }
      )
      .then((data)=>{
        if(data.data.status==='ok'){
            localStorage.setItem("email",email)
            window.location.href = `/Login`
          }else{
             alert("Invalid information");
          }
    })
    }
    return(
        <>
        <div className="register">
            <input type="name" required placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="email" required placeholder="Enter email id" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" required placeholder="Enter password" value={pss} onChange={(e)=>{setPss(e.target.value)}} />
            <Link to="/Login"><button>Login</button></Link>
            <button onClick={Register}>Registeration</button>
            <GoogleOAuthProvider clientId="722868784403-l3gf0q81spp8sm5k3rumpvio7e39bmh3.apps.googleusercontent.com">
            <GoogleLogin className="google"
            onSuccess={credentialResponse => {
                const details=jwt_decode(credentialResponse.credential)
                setName(details.name)
                setEmail(details.email)
                google(details)
            }}
            onError={() => {
                console.log('Login Failed')
                }}/>;
        </GoogleOAuthProvider>
        </div>
        </>
    )
}
export default Register