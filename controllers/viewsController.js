exports.getOverview = (req, res) => {
  res.status(200).render('overview', {
    title: 'Alll Tours'
  });
};

exports.getTour = (req, res) => {
  res.status(200).render('tours', {
    title: 'The forest hikers'
  });
};
