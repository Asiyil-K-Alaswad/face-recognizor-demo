const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

//to be replaced after learning databases
const database = {
    users:[
        {
            id:'000',
            name:"John Doe",
            email:"j@me.com",
            password:"eje",
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/',(req,res) => {
    res.send(database.users);
})

app.post('/signin',(req,res) => {
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password)
    {
        res.json(database.users[0]);
    }
    else{
        res.status(400).json('error logging in');
    }
})

app.post('/register',(req,res) => {
    const {email,name,passowrd} = req.body
    database.users.push({
        id:'001',
        name:name,
        email:email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length -1])
})

app.get('/profile/:id',(req,res) => {
    const {id} = req.params;
    let found = false;
    for(user of database.users)
    {
        if(id === user.id)
        {
            found=true;
            return res.json(user);
        }
    }
    if(!found)
    {
        res.status('400').json('not found');
    }
})

app.put('/image',(req,res) => {
    const {id} = req.body;
    console.log(`recieved id is ${id} of type ${typeof(id)}`)
    let found = false;
    for(user of database.users)
    {
        if(id === user.id)
        {
            found=true;
            user.entries++;
            return res.json(user.entries);
        }
    }
    if(!found)
    {
        res.status('400').json('not found');
    }
})

app.listen(3000, () => {
    console.log('app is running');
})