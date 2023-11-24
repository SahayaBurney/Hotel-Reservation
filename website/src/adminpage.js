import { useRef, useState } from 'react'
import './App.js'
import html2canvas  from 'html2canvas'
import jsPDF from 'jspdf'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Admin(){
    const pdRef=useRef();
    const [date,setDate]=useState("")
    const [time,setTime]=useState("")
    const [state,setState]=useState(false)
    const [value,setValue]=useState([])
    const Form=()=>{
        const val=date+time
        axios.post('http://localhost:3500/viewbooked',
        {
            val
        }).then((data)=>{
            if(data.data.status==='fail'){
                alert("Invalid information");
            }else{
                setValue(JSON.parse(data.data.status))
                setState(true)      
            }
        })
    }
    const Download=()=>{
        const input=pdRef.current
        html2canvas(input).then((canvas)=>{
            const imgData=canvas.toDataURL('image/png')
            const  pdf=new jsPDF('p','mm','a4',true)
            const pdfWidth=pdf.internal.pageSize.getWidth()
            const pdfHeight=pdf.internal.pageSize.getHeight()
            const imgWidth=canvas.width
            const imgHeight=canvas.height
            const ratio=Math.min(pdfWidth/imgWidth,pdfHeight/imgHeight)
            const imgX=(pdfWidth-imgWidth*ratio)/2
            const imgY=30
            pdf.addImage(imgData,'PNG',imgY,imgX,imgWidth*ratio,imgHeight*ratio)
            pdf.save(date+"_"+time+".pdf")
        })
    }
    return(
        <>
        <div className='adminform'>
            <input type='date' name='date' onChange={(e)=>{setDate(e.target.value)}} />
            <br></br>
            <input list='time' name='time' placeholder='Enter the timing' onChange={(e)=>{setTime(e.target.value)}} />
            <datalist id='time' >
                    <option value={"11.00 am to 1.00 am"} />
                    <option value={"1.00 pm to 3.00 pm"} />
                    <option value={"6.00 pm to 9.00 pm"} />
            </datalist>
            <br></br>
            <button onClick={Form} >Submit</button>
            <Link to='/setData'><button>Update</button></Link>
        </div>
        <div></div>
        
        {state &&<div className='fill' ref={pdRef}>
        <button onClick={Download} >Dowload</button>
        <table className='table' border={"2px solid black"}>
            <thead>
                <th>S.no</th>
                <th>Mail Id</th>
                <th>No of tickets</th>
                <th>Mno</th>
            </thead>
            <tbody>
        
        {value.map((ind, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{ind.email}</td>
            <td>{ind.no}</td>
            <td>{ind.pno}</td>
          </tr>
        ))}
      </tbody>
        </table>
        </div>

        }
        </>
    )
}
export default Admin