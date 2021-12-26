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
      '3. 사람이 많은 장소 (식당, 헬스장, 영화관 등)에 방문하신 적이 있나요?' : req.body.ck2, 
      '4. 마스크를 올바르게 착용하셨나요?' : req.body.ck3, 
      '5. 실내 장소에 방문할 때마다 출입자 명부를 잘 작성 하였나요?' : req.body.ck4, 
      '6. 타인과 1m이상 거리를 두고 있나요?' : req.body.ck5,
      '7. 매일 자신의 상태를 확인하고 있나요?' : req.body.ck6,} , ()=>{
        console.log('저장완료');
      });
  });


