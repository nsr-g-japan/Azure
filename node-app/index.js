const express = require('express')
const app =express()
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes');



app.get('/demo', (req, res)=>res.json({message: 'Welcome To Global Japan Network skill programme'}))
app.use(bodyParser.json({limit: '5000mb', extended: true}));
app.use('/', eventRoutes.routes);
app.listen(process.env.PORT || 80)