const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const app = express();

const fixedPORT = 4000;

// importing routes or hooking routes woth the application
const indexRouter = require('./routes/index.route');
const documentRouter = require('./routes/document.route');
const officerRouter = require('./routes/officer.route');

app.use('/', indexRouter);
app.use('/document', documentRouter);
app.use('/officer', officerRouter);

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.set('layout', 'layouts/layout');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(expressLayouts);
// this is for public folder on path /
app.use(express.static('public'));

app.listen(process.env.PORT || fixedPORT, () => {
  console.log(`listening to port ${process.env.PORT}`);
});
