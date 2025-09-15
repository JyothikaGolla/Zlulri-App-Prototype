const express = require('express');
const router = express.Router();
const App = require('../models/App');

router.get('/', async (req, res) => {
  const apps = await App.find();
  res.json(apps);
});

router.get('/:id', async (req, res) => {
  const app = await App.findById(req.params.id);
  res.json(app);
});

module.exports = router;
