import axios from "axios";
import { useState } from "react";

function Entry() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vchef, setVChef] = useState("");
  const [nchef, setNChef] = useState("");
  const [vitem, setVitem] = useState([]);
  const [nvitem, setNvitem] = useState([]);
  const [vstate, setVstate] = useState(false);
  const [nvstate, setNVstate] = useState(false);
  const [vdummy, setVDummy] = useState("");
  const [ndummy, setNDummy] = useState("");

  const addV = () => {
    setVitem([...vitem, vdummy]);
    setVDummy("");
    setVstate(true);
  };

  const addN = () => {
    setNvitem([...nvitem, ndummy]);
    setNDummy("");
    setNVstate(true);
  };

  const handleSubmit = () => {
    const svitem=JSON.stringify(vitem);
    const snvitem=JSON.stringify(nvitem);
    const newList = {
      date,
      time,
      vchef,
      nchef,
      svitem,
      snvitem,
    };
    axios.post("http://localhost:3500/api/lists",{ newList})
      .then((response) => {
        if (response.data.status === "ok") {
          alert("Updated")
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setVChef("");
    setNChef("");
    setDate("");
    setTime("");
    setVitem([]);
    setNvitem([]);
  };

  const stateV = () => {
    setNVstate(false);
    setVstate(true);
  };

  const stateNV = () => {
    setNVstate(true);
    setVstate(false);
  };

  return (
    <>
      <div className="fill">
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            name="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <br />
          <input
            list="time"
            name="time"
            required
            value={time}
            placeholder="Enter the timing"
            onChange={(e) => setTime(e.target.value)}
          />
          <datalist id="time">
            <option value={"11.00 am to 1.00 am"} />
            <option value={"1.00 pm to 3.00 pm"} />
            <option value={"6.00 pm to 9.00 pm"} />
          </datalist>
          <br />
          <input type="text" value={vchef} required placeholder="Enter Veg Chef Name" onChange={(e) => setVChef(e.target.value)} />
          <br />
          <input type="text"
            value={nchef}
            required
            placeholder="Enter Non Veg Chef Name"
            onChange={(e) => setNChef(e.target.value)}
          />
          <br />
          <input type="submit" />
        </form>
        <button onClick={stateV}>Add veg items</button>
        <button onClick={stateNV}>Add Non veg items</button>
      </div>
      <div>
        {vstate && (
          <div className="veg">
            <div className="fillveg">
              <input type="text" value={vdummy} placeholder="Enter veg items" onChange={(e) => {setVDummy(e.target.value);}}/>
              <button onClick={addV}>+</button>
              <br/>
              <h3>Total Veg Items :{vitem.length}</h3>
            </div>
            <div className="vegitems">
            <ul>
            {vitem.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
            </ul>
            </div>
          </div>
        )}
        {nvstate && (
          <div className="nveg">
            <div className="fillnveg">
              <input type="text" value={ndummy} placeholder="Enter non veg items" onChange={(e) => {setNDummy(e.target.value);}}/>
              <button onClick={addN}>+</button>
              <br />
              <h3>Total Non-Veg Items :{nvitem.length}</h3>
            </div>
            <div className="nvegitems">
            <ul>
            {nvitem.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
            </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Entry;
