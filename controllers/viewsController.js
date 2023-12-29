const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = (req, res) => {
  res.status(200).render('overview', {
    title: 'Alll Tours'
  });
};

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'review',
    fields: 'review rating user'
  });

  res.status(200).render('tour', {
    title: `${tour.name.tour}`,
    tour
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};
