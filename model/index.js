//创建mongo客户端对象
var MongoClient = require('mongodb').MongoClient

//使用url链接数据库
var url = "mongodb://localhost:27017";
var dbName = 'project';

//数据库连接方法分装
function connect(callback){
    MongoClient.connect(url, function(err,client) {
        if(err){
            console.log("数据库连接错误", err);
        }else{
            var db = client.db(dbName);
            callback && callback(db);
            client.close();  //关闭数据库
        }
    })
}

module.exports = {
    connect
}