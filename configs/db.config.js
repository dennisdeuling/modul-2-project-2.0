const mongoose = require('mongoose');

mongoose
	.connect('mongodb://localhost/module-2-project', {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(database => {
		console.log(`Connected to the Database: ${database.connections[0].name}`);
	})
	.catch(error => console.log(`Error connecting to mongo ${error}`));