// Copyright 2015-2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/*
const express = require('express');

const app = express();

// [START hello_world]
// Say hello!
app.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});
// [END hello_world]

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;
*/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const crawler = require('./test/crawler/crawler');

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
