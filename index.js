const express=require('express');
const bodyParser=require('body-parser');


const path=require('path');
const app=express()
const port=4000

var mysql=require('mysql')
var connInfo = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12345",
    database: "user"
}
var connection =mysql.createConnection(connInfo);
connection.connect(function(err){
if(err)
    throw err;
    console.log("database activated");
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
const publicDirectory=path.join(__dirname,'./public');
app.use(express.static(publicDirectory));
app.set('view engine','hbs');
app.get('/', (req, res) =>
{
   res.render("index")
    });

    app.post('/submit',function(req,res){
          
        var sql="INSERT into login values(null,'"+ req.body.user +"','"+ req.body.email +"')";
        connection.query(sql,function(err){
            if(err) throw err 
                res.render('index')
                res.redirect('/products')
                            
            })
        
       
            connection.end();
         })
   


    app.get('/products', (req, res) =>
{
   res.render("products")
    });
   

   
app.listen(port, () =>{
    console.log("server activated")
});