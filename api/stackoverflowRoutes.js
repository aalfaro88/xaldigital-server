// En api/stackoverflowRoutes.js

const express = require('express');
const router = express.Router();
const axios = require('axios'); 


router.get('/fetch-stackoverflow', async (req, res) => {
  try {

    const response = await axios.get('https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=perl&site=stackoverflow');
    
    res.status(200).json({ data: response.data });
  } catch (error) {

    console.error(error);
    res.status(500).json({ error: 'Error al obtener datos de Stack Overflow' });
  }
});

module.exports = router;
