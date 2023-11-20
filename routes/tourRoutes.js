const express = require('express');
const {
  getAllTours,
  postTour,
  getTour,
  deleteTour,
  // checkID,
  checkBody
} = require('./../controllers/tourController');

const router = express.Router();
// router.param('id', checkID);

router
  .route('/')
  .get(getAllTours)
  .post(checkBody, postTour);

router
  .route('/:id')
  .get(getTour)
  .delete(deleteTour);

module.exports = router;
