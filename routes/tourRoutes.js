const express = require('express');
const {
  getAllTours,
  postTour,
  getTour,
  deleteTour,
  checkBody,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  updateTour
} = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');

const router = express.Router();

router.use('/:tourId/reviews', reviewController);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/tour-stats').get(getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-giude', 'guide'),
    getMonthlyPlan
  );

router
  .route('/')
  .get(getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-giude'),
    postTour
  );

router
  .route('/:id')
  .get(getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-giud'),
    updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-giud'),
    deleteTour
  );

module.exports = router;
