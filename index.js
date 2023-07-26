const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, 'http://localhost:3000/react-book-portfolio/build')));

app.listen(port, () => {
	mongoose
		.connect('mongodb+srv://wknowpark797:!abcd1234@cluster0.czhuhd2.mongodb.net/')
		.then(() => console.log(`Server app listening on port ${port} with MongoDB`)) //접속 성공
		.catch((err) => console.log(err)); //접속 실패
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'http://localhost:3000/react-book-portfolio/build/index.html'));
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'http://localhost:3000/react-book-portfolio/build/index.html'));
});
