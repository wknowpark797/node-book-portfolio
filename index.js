// const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const config = require('./config/key');

// body parser 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

/*
	// react build 폴더
	app.use(express.static(path.join(__dirname, 'http://localhost:3000/react-book-portfolio/build')));
*/

// 전용 라우터 설정
app.use('/api/review', require('./router/reviewRouter'));
app.use('/api/user', require('./router/userRouter'));

// 데이터베이스 연동
app.listen(port, () => {
	mongoose
		.connect(config.mongoURI)
		.then(() => console.log(`Server app listening on port ${port} with MongoDB`)) //접속 성공
		.catch((err) => console.log(err)); //접속 실패
});

app.get('/', (req, res) => {
	res.send('Node Book Portfolio Server');
	// res.sendFile(path.join(__dirname, 'http://localhost:3000/react-book-portfolio/build/index.html'));
});

/*
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'http://localhost:3000/react-book-portfolio/build/index.html'));
	});
*/
