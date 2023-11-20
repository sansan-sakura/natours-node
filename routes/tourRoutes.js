const express = require('express');
const {
  getAllTours,
  postTour,
  getTour,
  deleteTour,
  // checkID,
  checkBody,
  aliasTopTours
} = require('./../controllers/tourController');

const router = express.Router();
// router.param('id', checkID);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router
  .route('/')
  .get(getAllTours)
  .post(checkBody, postTour);

router
  .route('/:id')
  .get(getTour)
  .delete(deleteTour);

module.exports = router;
