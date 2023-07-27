const express = require('express');
const router = express.Router();
const { Review } = require('../model/reviewSchema');
const { User } = require('../model/userSchema');
const { Counter } = require('../model/counterSchema');

// Review Create
router.post('/create', (req, res) => {
	console.log('create request: ', req.body);

	const params = req.body; // bookName, content

	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			params.reviewNum = doc.reviewNum;

			User.findOne({ uid: params.uid })
				.exec()
				.then((doc) => {
					params.writer = doc._id;

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
});

// Review List Read
router.get('/read/:num', (req, res) => {
	Review.find()
		.populate('writer')
		.sort({ createdAt: -1 })
		.limit(req.params.num)
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
router.delete('/delete/:id', (req, res) => {
	console.log('delete request: ', req.params.id);

	Review.deleteOne({ reviewNum: req.params.id })
		.exec()
		.then(() => {
			res.json({ success: true });
		})
		.catch((err) => {
			res.json({ success: false });
		});
});

module.exports = router;
