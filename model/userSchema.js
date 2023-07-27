const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		uid: String,
		displayName: String,
		userNum: Number,
	},
	{ collection: 'Users' }
);

const User = mongoose.model('User', userSchema);
module.exports = { User };
