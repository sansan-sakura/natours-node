const express = require('express');
const {
  getAllTours,
  postTour,
  getTour,
  deleteTour,
  checkBody,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan
} = require('./../controllers/tourController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, getAllTours)
  .post(checkBody, postTour);

router
  .route('/:id')
  .get(getTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-giud'),
    deleteTour
  );

module.exports = router;
