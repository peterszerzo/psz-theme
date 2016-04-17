const express = require('express');
const siteInfo = require('./../src/info.json');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/../assets'));

app.get('*', function(req, res) {
  res.render('index', siteInfo);
});

app.listen(1999, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Listening on post 1999');
});
