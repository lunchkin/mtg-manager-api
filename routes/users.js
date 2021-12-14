const express = require('express');
const router = express.Router();
const mtg = require('mtgsdk');
const { getAllSets } = require("./../models/MtgApiSets");
const { getSomeCards, getAllCards } = require("./../models/MtgApiCards");


router.get('/', async function(req, res, next) {
  const someCard = await mtg.card.find(3)
  res.send(someCard);
  //res.send('respond with a resource');
});

router.get('/all-sets', async function(req, res, next) {
  res.send(await getAllSets());
});

router.get('/some-cards', async function(req, res, next) {
 // const someCards = await getSomeCards();

  const allCards = await getAllCards();
  res.send('done');
});

module.exports = router;
