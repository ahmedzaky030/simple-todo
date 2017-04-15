
//[1]1. import express module

var express = require('express');
//[2].1. import students routes file  
var students = require('./routes/students');
//set the default router in different isolated router make the routing easy
var index = require('./routes/index');
//[4]1.import body to parse the body when posting or update date
var bodyParser = require('body-parser');
//[5]1.To solve CORS problem
var cors = require('cors');

//[1]2. instance of express
var app = express();

//[5]2. use cors
app.use(cors());


//[3]1. set 'views' value and tell the server from where  the views come  
app.set('views', __dirname + '/views');
//[3]2. set 'view engine' value 
app.set('view engine', 'ejs');


app.engine('html', require('ejs').renderFile);


app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//[1]3. set default (basic) route and handle it 
app.use('/', index);

//[2]2.use students router in routing
app.use('/students', students); 



//app.engine('ejs' , require('ejs').)


//[1] 4. the server listen on port number 3100 
app.listen(3100 , function(){
    console.log('server started running....')
})
