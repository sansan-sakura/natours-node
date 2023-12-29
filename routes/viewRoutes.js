const express = require('express');

const router = express.Router();

const viewsController = require('../controllers/viewsController');

router.get('/overview', viewsController.getOverview);

router.get('/tour/:slug', viewsController.getTour);
router.get('/login', viewsController.getLoginForm);

module.exports = router;
