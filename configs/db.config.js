const mongoose = require('mongoose');

mongoose
	.connect(process.env.DATABASE_URL, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(database => {
		console.log(`Connected to the Database: ${database.connections[0].name}`);
	})
	.catch(error => console.log(`Error connecting to mongo ${error}`));