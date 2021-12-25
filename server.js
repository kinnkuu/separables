const express = require('express');
const app = express(); 
app.use(express.static('public'));
app.use(express.static('index'));
app.set("view engine", "pug");
const MongoClient = require('mongodb').MongoClient;

let db;

app.use(express.urlencoded({extended: true}))

MongoClient.connect('mongodb+srv://gusdn5272:goqkfkrl9028@cluster0.wpjpn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',(error, client)=>{
    if (error) return console.log(error);
    db = client.db('checklist'); 
    app.listen(8080, ()=>{
      console.log('listening on 8080');
    });
  });


app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index/index.html')
});

app.get('/checklist', (req, res)=>{
  res.sendFile(__dirname + '/checklist.html');
});

app.post('/receive', (req, res)=>{ 
    console.log(req.body.user)
    console.log(req.body.ck1);
    console.log(req.body.ck2);
    console.log(req.body.ck3);
    console.log(req.body.ck4);
    console.log(req.body.ck5); 
    console.log(req.body.ck6);
    res.send("<script>alert('전송이 완료되었습니다.');location.href='/';</script>");
    db.collection('post').insertOne({user : req.body.user, ck1 : req.body.ck1, ck2 : req.body.ck2, ck3 : req.body.ck3, ck4 : req.body.ck4, ck5 : req.body.ck5, ck6 : req.body.ck6,} , ()=>{
        console.log('저장완료');
      });
  });


