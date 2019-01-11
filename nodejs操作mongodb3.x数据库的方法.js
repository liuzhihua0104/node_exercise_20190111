
//http://mongodb.github.io/node-mongodb-native/3.0/quick-start/quick-start/

/*
nodejs操作mongodb数据库

 1.安装mongodb、

    cnpm install mongodb --save


 2.引入mongodb下面的MongoClient
    var MongoClient = require('mongodb').MongoClient;


 3.定义数据库连接的地址 以及配置数据库
    qianfeng数据库的名称

    var url = 'mongodb://localhost:27017/';

    var dbName = 'shop'


 4.nodejs连接数据库


 MongoClient.connect(url,function(err,client){

        const db = client.db(dbName);  数据库db对象

 })

5.操作数据库
    


	 MongoClient.connect(url,function(err,client){

			const db = client.db(dbName);  数据库db对象


			MongoClient.connect(url,function(err,db){



				db.collection('user').insertOne({"name":"张三"},function(err,result){

					db.close() //关闭连接
				})

		     })

	 })
     

*/
var MongoClient = require('mongodb').MongoClient;


//定义连接数据库的地址

const  url = 'mongodb://localhost:27017/';
var dbName = 'shop'

//连接数据库
MongoClient.connect(url,(err,client)=>{

    if(err){
        console.log('数据连接失败');
        return false;
    }
    let db=client.db(dbName);   /*获取db对象*/

    db.collection("admin").insertOne({"name":"mongodb3.0","age":10},function(err){

        if(err){
            console.log('增加失败');
            return false;
        }
        console.log('增加成功');
        client.close();  /*关闭数据库*/
    })


})

