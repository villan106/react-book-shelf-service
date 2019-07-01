const express = require('express');
const BookJson = require('./BookJson');
const SearchJson = require('./SearchJson');
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.locals.headerData={

};

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'accept, authorization, content-type, x-requested-with');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', req.header('origin'));
    next();
});

app.get('/books', (req, res) => {
    if(!app.locals.headerData[req.headers.authorization]) {
        app.locals.headerData[req.headers.authorization] = {};
        app.locals.headerData[req.headers.authorization] = {BookJson};
    }
    res.json(app.locals.headerData[req.headers.authorization]['BookJson']);
});

app.put('/books/:id', (req, res) => {
    let bookData = app.locals.headerData[req.headers.authorization]['BookJson'];
    console.log(req.body, req.params);
    res.json(app.locals.headerData[req.headers.authorization]['BookJson']);
});

app.post('/search', (req, res) => {
    let books = SearchJson.books;
    var resp = _.filter(books, function(val) {
        var match = val['title'].includes(req.body.query);
        return match;
    });
    console.log(req.body.query, resp);
    res.json({books:resp});
});

app.listen(5000, ()=> {
    console.log(`5000 port is runnng...`);
})