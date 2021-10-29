const express=require('express');
const mongoose= require ('mongoose');
const cors= require('cors')
const pModel=require('./Models/model.js')
const app = express()
var bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/ProductData", {
  useNewUrlParser:true
})

app.get('/read', async (req, res)=>{
  pModel.find({},(err,result)=>{
    if(err){
      console.log(err);
    }
    res.send(result);
    console.log("Read succesfully");

  })
})

app.put('/update', async (req, res) =>{
  const cdc=req.body.cdc;
  const rdr=req.body.rdr;
  const sds=req.body.sds;
  const vatt=req.body.vatt;

  try {
  await  pModel.findById(id, (err, toUpdate)=>{
      toUpdate.cd=cdc;
      toUpdate.rd=rdr;
      toUpdate.sd=sds;
      toUpdate.vat=vatt;

      toUpdate.save();
      res.send("update")
    })

  } catch (err) {
      console.log(err)
  }
  console.log("succesfully Updated");
})


app.listen(5000, ()=>{
  console.log('Server is running on port 5000');
})
