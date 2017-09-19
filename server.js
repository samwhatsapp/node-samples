const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine','hbs');


app.use((req,res,next)=>{
	var now = new Date().toString();
	log={
		time: now,
		url: req.url,
		method: req.method
	}
	fs.appendFile('server.log',JSON.stringify(log)+'\n',(err)=>{

	});
	console.log(log);
	next();
});

// app.use((req,res,next)=>{
// 	res.render('maintain.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});

app.get('/',(req,res)=>{
	res.render('home.hbs',{
		title: 'My Website',
		message: 'Welcome to my website'
	});
});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		title: 'My Title'
	});
});

app.listen(3000,()=>{
	console.log('listening on port 3000..');
})