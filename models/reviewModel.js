const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: { type: String, required: [true, 'Review cannot be empty'] },
    rating: { type: Number, min: 1, max: 5 },
    createdAt: { type: String },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must blong to a tour']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must blong to a user']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

reviewSchema.pre(/^find/, function(next) {
  //   this.populate({
  //     path: 'tour',
  //     select: 'name'
  //   })
  this.populate({
    path: 'user',
    select: 'name photo'
  });
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
