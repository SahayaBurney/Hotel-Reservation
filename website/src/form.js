import { useState } from 'react';
import './App.css'
import Heading from './Head';
import responsiveVoice from 'responsivevoice';
import axios from 'axios';
function Forming(){
    const [date,setDate]=useState("")
    const [time,setTime]=useState("")
    const [no,setNo]=useState(0)
    const [pno,setPno]=useState("")
    const book=()=>{
        const email=localStorage.getItem("email")
        const text={date:date+time,no:no,pno:pno,email:email}
        alert("Hello you have booked on "+date+" time "+time+" with  with phone number "+pno+" with tickets "+no)
        axios.post('http://localhost:3500/Form',
        {
            text,
            email,  
        }).then((data)=>{
            if(data.data.status==='pass'){
                responsiveVoice.onvoicesloaded = () => {
                    responsiveVoice.speak('Hello, this is a test message.');
                  };
                window.location.href = `/Mainpage`
            }else{
                alert("something went wrong try again later")
            }
        })
    }
    return(
        <>
        <Heading />
        <div className='abt'>
           <div className='frm1' >
                <input type='date' name='date' placeholder='Enter date of the booking' onChange={(e)=>{setDate(e.target.value)}} />
                <br></br>
                <input list='time' name='time' placeholder='Enter the timing' onChange={(e)=>{setTime(e.target.value)}} />
                <datalist id='time' >
                    <option value={"11.00 am to 1.00 am"} />
                    <option value={"1.00 pm to 3.00 pm"} />
                    <option value={"6.00 pm to 9.00 pm"} />
                </datalist>
           </div>
           <div className='frm2' >
            <input type='number' name='noticket' placeholder='Enter number of the tickets' min={1} onChange={(e)=>{setNo(e.target.value)}} />
            <br></br>
            <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" onChange={(e)=>{setPno(e.target.value)}} placeholder='Enter your phone number'/>
           </div>
           <button onClick={book} >Confirm Booking</button>
        </div>
        </>
    )
}
export default Forming;


