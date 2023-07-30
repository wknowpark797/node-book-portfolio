const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
	{
		bookName: String,
		reviewContent: String,
		reviewNum: Number,
		writer: {
			ref: 'User',
			type: mongoose.Schema.Types.ObjectId,
		},
	},
	{ collection: 'Reviews', timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);
module.exports = { Review };
