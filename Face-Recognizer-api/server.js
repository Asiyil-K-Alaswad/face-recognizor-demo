const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex');
const { type } = require("@testing-library/user-event/dist/type");

const db = knex({
    client: 'pg',
    connection: {
        host : "127.0.0.1",
        port : 5432,
        user : "postgres",
        password : "2282005",
        database : "face-recognizor-database"
    }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res) => {
    res.send(database.users);
})

app.post('/signin',(req,res) => {
    db.select('email','hash').from('login')
        .where('email','=',req.body.email)
    .then(data => {
        const isValid = bcrypt.compareSync(String(req.body.password),String(data[0].hash));
        if(isValid){
            return db.select('*').from('users').where('email','=',data[0].email)
            .then(user => res.json(user[0]))
            .catch(err => res.status(400).json('error getting user'))
        }else{
            res.json('wrong credintials')
        }
    })
    .catch(err => res.status(400).json('wrong credintials'))
})

app.post('/register',(req,res) => {
    const {email,name,passowrd: password} = req.body;
    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx('login')
        .insert({
            email:email,
            hash:hash
        })
        .returning('email')
        .then(loginEmail => {
            return trx('users').insert({
                email:loginEmail[0].email,
                name:name,
                joined: new Date()})
            .returning("*")
            .then(user =>{
                res.json(user[0])})
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.json('unable to register'))
    
})

app.get('/profile/:id',(req,res) => {
    const {id} = req.params;
    console.log(id);
    db.select('*').from('users').where({id:id})
    .then(user => {
        if(user.length)
        {
            res.json(user[0])
        }
        else {
            res.status('400').json('not found');
        }})
    .catch(err => {
        res.status('400').json('error getting user');
    })
})

app.put('/image',(req,res) => {
    const {id} = req.body;
    console.log(`recieved id is ${id} of type ${typeof(id)}`)
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries)
    })
    .catch(err => {res.status(400).json('error updating entries')})
})

app.listen(3000, () => {
    console.log('app is running');
})