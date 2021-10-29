import './App.css';
import React, {useState, useEffect}  from 'react'
import axios from 'axios';



function App() {

  const [value, setvalue]=useState(0)
  const [exr, setexr]=useState(0)
  const [pid, setpid]=useState(0)

  const [dbinfo, setdbinfo]=useState([])

  const insurancre = value * (1/100);
  const charge = value * (1/100);
  const ic = insurancre + charge;
  const total_value = value+ic;

  const a_v = total_value * exr;

  const [cdc, setcdc]=useState(0)
  const [rdr, setrdr]=useState(0)
  const [sds, setsds]=useState(0)
  const [vatt, setvatt]=useState(0)


  const changeit =(id)=>{
    axios.put("http://localhost:5000/update", {
      cdc:cdc,
      rdr:rdr,
      sds:sds,
      vatt:vatt,
      id:id
    })
  }

  useEffect(()=>{
 axios.get("http://localhost:5000/read").then((response)=>{
   console.log(response);
   setdbinfo(response.data)
   })
   },[]);


  return (
    <div className="App">

      <input type="number" placeholder="Value ($)" onChange={(e)=>{setvalue(e.target.value)}} /> <br/>
      <input type="number" placeholder="Exchange Rate" onChange={(e)=>{setexr(e.target.value)}} /> <br/>
      <input type="number" placeholder="Product ID" onChange={(e)=>{setpid(e.target.value)}} /> <br/>

      <div className="total">

       <p> Insurance 1% = {insurancre} USD </p>
       <p> charge 1% = {charge} USD </p><hr/>

       <p> Total Value = {total_value} USD </p>

      </div>

      {dbinfo.filter((val)=>{
        if (pid == ""){
          return val
        }
    else if(val.id.includes(pid)){
          return val
        }
      }).map((val, key)=>{
        const cdp= val.cd;
        const rdp= val.rd;
        const sdp= val.sd;
        const vatp= val.vat;

        const cd = a_v * (cdp/100)
        const rd = a_v * (rdp/100)
        const sd = a_v * (sdp/100)
        const vat = a_v * (vatp/100)

        const total = cd+rd+sd+vat



       return(
         <div className="tpp">
         <h1>{val.description}</h1>
         <h1>{val.id}</h1>
          <div className="per">

        CD %  <input placeholder={val.cd} type="number" onChange={(e)=>{setcdc(e.target.value)}}  /><br/>
        RD %  <input placeholder={val.rd} onChange={(e)=>{setrdr(e.target.value)}} /><br/>
        SD % <input placeholder={val.sd} onChange={(e)=>{setsds(e.target.value)}} /><br/>
        VAT % <input placeholder={val.vat} onChange={(e)=>{setvatt(e.target.value)}} /><br/>
        <button ocClick={()=>{changeit(val._id)}}>Change</button>

          </div>

          <div className="per">
          <p> A/V = {a_v} TK</p>
         <p>CD = {cd} TK</p>
         <p>RD = {rd} TK</p>
         <p>SD = {sd} TK</p>
         <p>VAT = {vat} TK</p><hr/>
         <p>Total = {total} TK</p>
           </div>

         </div>
       )
     })}
    </div>
  );
}

export default App;
