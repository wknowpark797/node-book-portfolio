const express = require('express');
const router = express.Router();
const { Review } = require('../model/reviewSchema');
const { Counter } = require('../model/counterSchema');

router.post('/create', (req, res) => {
	console.log('request: ', req.body);

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

module.exports = router;
