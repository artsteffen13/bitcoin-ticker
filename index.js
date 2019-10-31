const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.sendFile(`${__dirname}/index.html`)
});

app.post('/', function (req, res) {
    //console.log(req.body.crypto);
    let crypto = req.body.crypto;
    let fiat = req.body.fiat;
    let amount = req.body.amount;

    const baseURL = 'https://apiv2.bitcoinaverage.com/convert/global';

    let options = {
        url: baseURL,
        method: 'GET',
        qs: {
            from: crypto,
            to: fiat,
            amount: amount
        },
    };


    request(options, function (error, response, body) {
    let data = JSON.parse(body);
    console.log(body);
    let price = data.price;

    console.log(price);

    let currentDate = data.time;

    res.write(`<p>The current date is ${currentDate}<p>`);

    res.write(`<h1>${amount} ${crypto} is ${price} ${fiat}</h1>`);

    res.send();
    });
});

app.listen(3000, function () {
   console.log(`Server is running on port ${port}`)
});

