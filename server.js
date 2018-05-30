const express = require('express');
const hbs = require('hbs');
const path = require('path');
const fs = require('fs');

const app =  express();


hbs.registerPartials(path.join(__dirname,'views','partials'));
app.set('view engine', 'hbs');

app.use((req,res,next)=>{

    let time = new Date().toString();
    let log = `${time} ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log',`${log} \n`,(err)=>{
        if(err){
            console.log('Unable to append to server.log')
        }
    });


   



   next();
});

//for maintenance mode
app.use((req,res,next)=>{
    res.render('maintenance.hbs',{
        pageTitle:'Home',
        welcomeMessage:'Our site is currently under maintenance, Kindly visit us later'
    })

    // next();

});


app.use(express.static(path.join(__dirname, 'public')));







hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('capitalizeText',(text)=>{
    return text.toUpperCase();
});

app.get('/',(req, res) =>  {
    // res.send('<h1> First Express App</h1>');

    // res.send({
    //     name: "Harbie",
    //     reason:"This is the first express app",
    //     likes: [
    //         'citizen', 'neutrality'
    //     ]
    // });

    res.render('home.hbs',{
        pageTitle:'Home',
        welcomeMessage:'Welcome to my Home Page'
     
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About'
    });
});





app.listen(3000,()=>{
    console.log('Server is up and running on port 3000');
});