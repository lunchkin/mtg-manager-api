const axios = require("axios");
const mtgHost = "https://api.magicthegathering.io/v1/";
const { card: mtgCard } = require('mtgsdk');

const CARDS_PER_PAGE = 100;

module.exports = {
    getAllCards: async function() {
        let stillGettingData = true;
        let pageNumber = 1;
        let cardData = {};
        let cardCount = 0;


        // While we are still reading in card data
        while (stillGettingData) {
            if (pageNumber % 10 === 0) {
                console.log("Getting page " + pageNumber);
            }

            cardData = await this.getSomeCards(CARDS_PER_PAGE, pageNumber);

            // TODO: Write card data into database. If entry exists, just update it

            // If the data comes back empty
            if (!cardData.length) {
                // We are done gathering card data
                stillGettingData = false;
                continue;
            }

            cardCount += cardData.length;

            // Move on to the next page
            pageNumber++;
        }

        return {success: true, cardCount: cardCount};
    },

    // Just a test to see if this works.
    // todo: remove when done
    getSomeCards: function(pageSize = 100, page = 1) {
        return mtgCard.where({ pageSize: pageSize, page: page });
    },

    // Call to MTG api to get data for all of the sets
    getCardByNumber: async function(number) {
        try {
            const allMTGSets = await axios.get(`${mtgHost}sets`);
            return {success: true, data: allMTGSets.data};
        } catch (error) {
            console.log(error);
            return {success: false, data: {}};
        }
    },
};