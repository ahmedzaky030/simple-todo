var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/test');




// MongoClient.connect('mongodb://localhost:27017/test', function(err,db){
//     if(err) throw err;
//     console.log('Connected from mongoClient');
//     //db.collection('todos').insert({'text':'todo4','isCompleted':false})
// });



router.get('/' , function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    db.todos.find(function(err,todos){
        if(err){
            console.log(err);
        } else {
            console.log('inside get students');
            //res.header("Access-Control-Allow-Origin", "*");
            res.json(todos);
        }

    })
});

router.get('/:id' , function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
db.todos.findOne({
    _id:mongojs.ObjectId(req.params.id)
}, function(err , todos){
    if(err){
        console.log('error in get by id');
    } else {
        res.json(todos);
    }
} )

});


router.post('/' , function(req, res){
    req.header("Access-Control-Allow-Origin", "*");
 var todo = req.body;
 //console.log(todo);
 //console.log('post function');
 if(!todo.text || !(todo.isCompleted + '')){
     res.status(400);
     res.json({
         "error":"invalid Data"
     })
 } else {
     //console.log('enter save');
     db.todos.save(todo, function(err, result){
         if(err){
        console.log('error in save');
    } else {
        //console.log('results');
        //console.log(result);
        res.json(result);
    }
     })

 }
  
});


router.put('/:id' , function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    console.log('inside put verb');
var todo = req.body;
console.log('the body');
console.log(todo);
var updObj ={};
if (todo.isCompleted){
    updObj.isCompleted = todo.isCompleted;
}

if(todo.text){
    updObj.text = todo.text;
}
console.log('the updated Object');
console.log(updObj);
if(!updObj){
res.status(404);
res.json({"status":"invalid data"});
}else {
    db.todos.update({
        _id:mongojs.ObjectId(req.params.id)
    },updObj,function(err, result){
        if(err){
            console.log('error in save');
        }
        else {
            res.json(result);
        }
    })
}

});



router.delete('/:id' , function(req, res){
var id = req.params['id'];
//console.log(id);
if(id){
    db.todos.remove({_id :mongojs.ObjectId(id)},null , function(err , result){
        if(err){
            console.log('error in delete');            
        } else {
            console.log(result)
            res.json(result);
        }
    })
}
});

module.exports = router;