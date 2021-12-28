const express = require('express');
const app = express(); 
app.use(express.static('public'));
app.use(express.static('index'));
const MongoClient = require('mongodb').MongoClient;
const port = process.env.PORT;

let db;







app.use(express.urlencoded({extended: true}))

MongoClient.connect('mongodb+srv://gusdn5272:goqkfkrl9028@cluster0.wpjpn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',(error, client)=>{
    if (error) return console.log(error);
    db = client.db('checklist'); 
    app.listen(port, ()=>{
      console.log(`listening on ${port}`);
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
    db.collection('post').insertOne({
      '1. 이름' : req.body.user, 
      '2. 물과 비누를 사용하여 20초 이상 손을 자주 씻었나요?' : req.body.ck1, 
      '3. 하루에 물을 1리터 이상 마셨나요?' : req.body.ck2, 
      '4. 영양소를 골고루 갖춘 음식을 드셨나요?' : req.body.ck3, 
      '5. 실내에 있을 때 수시로 환기를 하셨나요?' : req.body.ck4, 
      '6. 마스크를 올바르게 착용하셨나요?' : req.body.ck5,
      '7. 날씨에 맞는 옷을 입으셨나요?' : req.body.ck6,} , ()=>{
        console.log('저장완료');
      });
  });


