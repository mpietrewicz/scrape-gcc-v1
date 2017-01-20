const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const crawler = require('./crawler/crawler');

const crawlerEngine = new crawler();

app.set('port', (process.env.PORT || 8080));
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.get('/', (req, resp) => {

    const url = "http://allegro.pl/6-i-2002-2008-147321?a_text_i%5B14%5D%5B0%5D=140&a_enum%5B16%5D%5B1%5D=1&a_enum%5B16%5D%5B4%5D=4&a_enum%5B13%5D%5B3%5D=3&price_to=12000&a_text_i%5B4%5D%5B1%5D=190000&a_enum%5B128790%5D%5B2%5D=2&a_enum%5B178%5D%5B1%5D=1";

    crawlerEngine.scrapeAllegro(url).then(function (result) {
        resp.render('index', {offers: result.offers});
    });
});

app.post('/scrape', (req, resp) => {
    crawlerEngine.scrape(req.body.url, req.body.selector).then((result) =>{
       resp.json(result);
    });
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
