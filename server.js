const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userRoute = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'client')));

app.use('/users', userRoute);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
