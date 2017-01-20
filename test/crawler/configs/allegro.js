const config = {
    offers: {
        listItem: ".offer"
        , data: {
            header: "h2.offer-header a",
            url: {
                selector: "h2.offer-header a",
                attr: "href"
            },
            price: "div .offer-price"
        }
    }
};

module.exports = config;