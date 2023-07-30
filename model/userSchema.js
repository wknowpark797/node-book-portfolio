const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		uid: String,
		userNum: Number,
		displayName: String,
	},
	{ collection: 'Users' }
);

const User = mongoose.model('User', userSchema);
module.exports = { User };
