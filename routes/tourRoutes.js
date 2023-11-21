const express = require('express');
const {
  getAllTours,
  postTour,
  getTour,
  deleteTour,
  // checkID,
  checkBody,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan
} = require('./../controllers/tourController');

const router = express.Router();
// router.param('id', checkID);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router
  .route('/')
  .get(getAllTours)
  .post(checkBody, postTour);

router
  .route('/:id')
  .get(getTour)
  .delete(deleteTour);

module.exports = router;
