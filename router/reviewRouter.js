const express = require('express');
const router = express.Router();
const { Review } = require('../model/reviewSchema');
const { Counter } = require('../model/counterSchema');

// Review Create
router.post('/create', (req, res) => {
	console.log('create request: ', req.body);

	const params = req.body;

	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			params.reviewNum = doc.reviewNum;

			const ReviewModel = new Review(params);

			ReviewModel.save().then(() => {
				Counter.updateOne({ name: 'counter' }, { $inc: { reviewNum: 1 } })
					.exec()
					.then(() => {
						res.json({ success: true });
					})
					.catch(() => {
						res.json({ success: false });
					});
			});
		});
});

// Review List Read
router.get('/read', (req, res) => {
	Review.find()
		.exec()
		.then((doc) => {
			console.log('review list: ', doc);
			res.json({ success: true, reviewList: doc });
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false });
		});
});

// Review Delete
router.post('/delete', (req, res) => {
	console.log('delete request: ', req.body);

	Review.deleteOne({ reviewNum: req.body.reviewNum })
		.exec()
		.then(() => {
			res.json({ success: true });
		})
		.catch((err) => {
			res.json({ success: false });
		});
});

module.exports = router;
