var express = require('express');
var router = express.Router();
var model = require("../model");
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  var username = req.session.username || "";
  var page = req.query.page || 1;
  var data = {
    total: 0, //总共多少页
    curPage: page,  //当前页
    list :[] //当前页的文章列表
  }
  var pageSize = 6; //每页展示6篇留言
  model.connect(function(db){
    // 1、查询所有文章
    db.collection('articles').find().toArray(function(err, docs){
      data.total = Math.ceil(docs.length / pageSize);
      // 2、查询当前页的文章列表
      model.connect(function(db) {
        // sort({_id:-1})倒序查询，最新数据最先显示 
        //limit(pageSize)每次查询页数
        //skip((page -1) * pageSize) 游标向前移动多少格查询；每次点击页数跳过前一次页数内的留言
        db.collection('articles').find().sort({_id:-1}).limit(pageSize).skip((page - 
          1) * pageSize).toArray(function(err, docs2){
            
            //删除留言效果
            if(docs2.length == 0 ){
              res.redirect('/?page ='+((page -1) || 1))  //页面最少也为第一页
            }else{
                docs2.map((ele, index) => {
                ele['time'] = moment(ele.id).format('YYYY-MM-DD HH:mm:ss')
              })
              data.list = docs2
            }
            res.render('index', { username:username ,data:data});
          })
      })

    })
  })
});

//渲染注册页
router.get("/regist",function(req, res ,next) {
  res.render('regist',{})
})

// 渲染登录页
router.get("/login", function(req ,res ,next){
  res.render('login',{})
})

// 渲染写留言页面 /编辑留言页
router.get("/write", function(req ,res ,next){
  var username = req.session.username || '';
  var id = parseInt(req.query.id);
  var page = req.query.page;
  var item = {
    title:'',
    content:'',
  }
  if(id){  //编辑
    model.connect(function(db){
      db.collection('articles').findOne({id:id}, function(err,docs){
          if(err){
            console.log('查询失败');
          }else{
              item = docs;
              console.log(docs);
              item['page'] = page;
              res.render('write',{username:username, item:item})
          }
      })
    })
  }else{   //新增
    res.render('write',{username:username, item:item})
  }
})

//渲染详情页
router.get('/detail', function(req,res ,next){
  var id = parseInt(req.query.id);
  var username = req.session.username || "";
  model.connect(function(db){
    db.collection('articles').findOne({id: id}, function(err, docs){
      if(err){
        console.log("查询失败",err)
      }else{
        var item = docs;
        item['time'] = moment(item.id).format('YYYY-MM-DD HH:mm:ss');
        res.render('detail',{item:item, username:username})
      }
    })
  })
})
module.exports = router;
