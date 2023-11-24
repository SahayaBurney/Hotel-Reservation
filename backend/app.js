const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
const user=require('./mongo')
require('dotenv').config();
mongoose.set('strictQuery', false);
app.use(cors());
app.use(express.json());
const uri=process.env.ATLAS_URL;
const fs = require('fs');

var database=mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{console.log("connected to db");})
.catch((error)=>{console.log("unsucessful connection to db "+error)})

app.get('/api/lists', async (req, res) => {
  res.json( JSON.parse(await fs.promises.readFile("datas.json")));
})
app.post('/Register',async (req,res)=>{
  const addUser=user ({
    name:req.body.name,
    email:req.body.email,
    pass:req.body.pss
  })
  const findmail=await user.findOne({email:req.body.email})
  if (findmail){
    console.log("found already")
    res.json({status:"failed"});
  }
  else{
    addUser.save().then(()=>{
      console.log("Added User")
  })
  res.json({status:"ok"})
  }
})
app.post('/Form',async(req,res)=>{

  user.updateOne(
    { email: req.body.email },
    { $push: { booked_period: req.body.text } } 
  )
  .then(result => {
      res.json({status:"pass"})
    })
    .catch(error => {
      console.error('Error occurred during update:', error);
    });
})
app.post('/viewbooked', async (req, res) => {
  const  date = req.body.val;
  user.find({ "booked_period": { $elemMatch: { date } } })
    .then(docs => {
      const matchedValues = [];
      docs.forEach(doc => {
        const values = doc.booked_period;
        matchedValues.push(...values);
      });
      res.json({ status: JSON.stringify(matchedValues) });
    })
    .catch(error => {
      console.error('Error occurred during find:', error);
      res.json({ status: "error" });
    });
});
app.post('/google',async(req,res)=>{
  const addUser=user ({
    name:req.body.n,
    email:req.body.e,
    pass:req.body.p
  })
  const findmail=await user.findOne({email:req.body.email,pass:req.body.pss})
  if (findmail){
    console.log("found already")
    res.json({status:"continue"})
  }
  else{
    addUser.save().then(()=>{
      console.log("Added User")
  })
  res.json({status:"ok"})
  }
})
app.post('/Login',async(req,res)=>{
  const findmail=await user.findOne({email:req.body.email,pass:req.body.pss})
    if(findmail){
        res.json({status:(findmail.name+" "+findmail.email)})
    }
    else{
        console.log("failed login")
        res.json({status:"fail"});
    }
})
app.post('/api/lists', async(req, res) => {
const newList = req.body.newList;
try {
  fs.accessSync("datas.json");
} 
catch (error) {
  try {
    fs.writeFileSync("datas.json", '[]');
  } catch (err) {
    console.error(err);
  }
}

const totalData = JSON.parse(await fs.promises.readFile("datas.json"));
totalData.push({
  ...newList
});
await fs.promises.writeFile("datas.json", JSON.stringify(totalData, null, 2));
});

app.listen(3500, () => {
  console.log(`Server running on port 3500`);
});
