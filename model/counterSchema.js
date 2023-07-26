const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema(
	{
		name: String,
		reviewNum: Number,
	},
	{ collection: 'Counter' }
);

const Counter = mongoose.model('Counter', counterSchema);
module.exports = { Counter };
