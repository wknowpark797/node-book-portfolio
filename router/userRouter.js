const express = require('express');
const router = express.Router();
const { User } = require('../model/userSchema');
const { Counter } = require('../model/counterSchema');

// Join
router.post('/join', (req, res) => {
	console.log('join request: ', req.body);

	const params = req.body; // uid, displayName

	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			params.userNum = doc.userNum;

			const UserModel = new User(params);

			UserModel.save().then(() => {
				Counter.updateOne({ name: 'counter' }, { $inc: { userNum: 1 } })
					.exec()
					.then(() => {
						res.json({ success: true });
					})
					.catch(() => {
						res.json({ success: fales });
					});
			});
		});
});

module.exports = router;
