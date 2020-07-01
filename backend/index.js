const express = require('express');
const app = express();
const PORT = 3001;

const phonesRouter = require('./routes/phones');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.options('/*',(req, res, next) => res.send());

app.use('/phones', phonesRouter);

app.listen(PORT, ()=> console.log('server running on PORT '+PORT));