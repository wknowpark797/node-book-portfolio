const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
	{
		bookName: String,
		content: String,
		reviewNum: Number,
	},
	{ collection: 'Reviews' }
);

const Review = mongoose.model('Review', reviewSchema);
module.exports = { Review };
