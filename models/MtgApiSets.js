const axios = require("axios");
const mtgHost = "https://api.magicthegathering.io/v1/";
const { set: mtgSet } = require('mtgsdk')

module.exports = {
    // Call to MTG api to get data for all of the sets
    getAllSets: async function() {
        try {
            const allMTGSets = await axios.get(`${mtgHost}sets`);
            return {success: true, data: allMTGSets.data};
        } catch (error) {
            console.log(error);
            return {success: false, data: {}};
        }
    },

    getSetBySearch: async function(options) {
        try {
            const mtgSetResults = await mtgSet.where({options});
            return {success: true, data: mtgSetResults.data};
        } catch (error) {
            console.log(error);
            return {success: false, data: {}};
        }
    },

    getSetByID: async function(setID) {
        if (setID === undefined) {
            console.log('setID is undefined');
            return {success: false, data: {}};
        }

        mtgSet.find(setID)
    },
};