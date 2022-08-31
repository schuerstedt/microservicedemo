const unleash = require('unleash-client');
const express = require('express');
unleash.initialize({
  url: 'http://localhost:3000/api/',
  appName: 'default',
  environment: process.env.APP_ENV,
  customHeaders: { Authorization: 'default:development.unleash-insecure-api-token' },
});

const app = express();
const port = 5555;

app.get('/', (req, res) =>  {

    res.send('Hello World!');
})
setInterval(() => {
  if (unleash.isEnabled('DemoToggle')) {
    console.log('Toggle enabled');
  } else {
    console.log('Toggle disabled');
  }
  console.log(unleash.getVariant('welchefarbe').payload.value);
}, 1000);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));