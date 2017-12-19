const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const convert = require('json-to-line-protocol').convert;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'JSON to Line Protocol Translation';

app.get('/', (request, response) => {
  response.send('Hello world!');
});

app.post('/api/v1/translate', (request, response) => {
  if (!request.body.measurement || !request.body.fields) {
    return response
      .status(422)
      .send({
        error: `Expected format: { measurement: <String>, (optional) tags: <Object>, fields: <Object>, (optional) ts: <Float> }. You're missing a measurement or fields property.`
      });
  }
  const line = convert(request.body);
  console.log('line', line);

  return response.status(200).send(line);
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
