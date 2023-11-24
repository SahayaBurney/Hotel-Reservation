import Heading from "./Head"
import { useState } from "react"
import { useEffect } from "react"
function Menuvalue(){
    const [date,setDate]=useState("")
    const [time,setTime]=useState("")
    const [state,setState]=useState(false)
    const [data,setData]=useState([])
    const [specificValue, setSpecificValue] = useState('');
    const [vitem,setVitem]=useState([])
    const [nvitem,setNVitem]=useState([])
    const url="http://localhost:3500/api/lists"
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:3500/api/lists");
            const jsonData = await response.json();
            setData(jsonData);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);
       
      const add = () => {
        setState(false);
        const result = data.find((item) => item.date === date && item.time === time);
        if (result) {
          setSpecificValue(result);
          setVitem(JSON.parse(result.svitem))
          setNVitem(JSON.parse(result.snvitem))
        } else {
          setSpecificValue("");
          alert("not yet opened")
        }
        setState(true);
      };
    
    return(
        <>
        <Heading />
        <div className="selector">
            <input type="date" required name="date" onChange={(e)=>{setDate(e.target.value)}} />
            <br />
            <input list='time' required name='time' placeholder='Enter the timing' onChange={(e)=>{setTime(e.target.value)}} />
                <datalist id='time' >
                    <option value={"11.00 am to 1.00 am"} />
                    <option value={"1.00 pm to 3.00 pm"} />
                    <option value={"6.00 pm to 9.00 pm"} />
                </datalist>
            <input type="submit" value={"submit"} onClick={add} />
        </div>
        <div className="menuchange">
            {
                state &&
                <table id="menu">
                     <tr>
                        <td>Vegeterian Chef Name:{specificValue.vchef}</td>
                        <td>Non Vegeterian chef name:{specificValue.nchef} </td>
                     </tr>
                     <tr>
                      <td>
                        <ul>
                          {
                            vitem.map((item)=>(
                              <li>{item}</li>
                            ))
                          }
                        </ul>
                      </td>
                      <td>
                        <ul>
                          {
                            nvitem.map((item)=>(
                              <li>{item}</li>
                            ))
                          }
                        </ul>
                      </td>
                     </tr>
                </table>
            }
        </div>
        </>
    )
}
export default Menuvalue