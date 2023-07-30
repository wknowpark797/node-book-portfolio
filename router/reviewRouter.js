const express = require('express');
const router = express.Router();
const { Review } = require('../model/reviewSchema');
const { User } = require('../model/userSchema');
const { Counter } = require('../model/counterSchema');

// Review Create
router.post('/create', (req, res) => {
	const params = req.body; // { bookName, reviewContent, uid }

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

// Review Read (List)
router.get('/read/:limit', (req, res) => {
	Review.find()
		.populate('writer')
		.sort({ createdAt: -1 })
		.limit(req.params.limit)
		.exec()
		.then((doc) => {
			res.json({ success: true, reviewList: doc });
		})
		.catch((err) => {
			res.json({ success: false, err: err });
		});
});

// Review Detail
router.get('/detail/:num', (req, res) => {
	Review.findOne({ reviewNum: req.params.num })
		.populate('writer')
		.exec()
		.then((doc) => {
			res.json({ success: true, detail: doc });
		})
		.catch((err) => {
			res.json({ success: false, err: err });
		});
});

// Review Update
router.put('/update', (req, res) => {
	const item = {
		bookName: req.body.bookName,
		reviewContent: req.body.reviewContent,
	};

	Review.updateOne({ reviewNum: req.body.reviewNum }, { $set: item })
		.exec()
		.then(() => {
			res.json({ success: true });
		})
		.catch(() => {
			res.json({ success: false });
		});
});

// Review Delete
router.delete('/delete/:num', (req, res) => {
	Review.deleteOne({ reviewNum: req.params.num })
		.exec()
		.then(() => {
			res.json({ success: true });
		})
		.catch(() => {
			res.json({ success: false });
		});
});

module.exports = router;
