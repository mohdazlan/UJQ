if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env' });
}

const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const app = express();

const fixedPORT = 4000;

// importing routes or hooking routes woth the application
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const documentRouter = require('./routes/documents');
const officerRouter = require('./routes/officers');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
// this is for public folder on path /
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.error('Connected to Mongoose'));

app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/documents', documentRouter);
app.use('/officers', officerRouter);

app.listen(process.env.PORT || fixedPORT, () => {
  console.log(`listening to port ${process.env.PORT}`);
});
