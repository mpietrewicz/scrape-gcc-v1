const scrapeIt = require('scrape-it');
const allegroConfig = require('./configs/allegro');

class Crawler {

    scrapeAllegro(url) {
        return scrapeIt(url, allegroConfig);
    }

    scrape(url, config){
        return scrapeIt(url, config);
    }
}

module.exports = Crawler;