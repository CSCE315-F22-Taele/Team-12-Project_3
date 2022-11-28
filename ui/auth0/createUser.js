function create(user, callback) {
	//this example uses the "pg" library
	//more info here: https://github.com/brianc/node-postgres

	const bcrypt = require("bcrypt");
	const postgres = require("pg");

	// call signup API
	// given user.email, user.username, user.password

	/* 
	const conString =
		"postgresql://csce315_912_cherian:830002546@csce-315-db.engr.tamu.edu/csce315_912_12";
	postgres.connect(conString, function (err, client, done) {
		if (err) return callback(err);

		bcrypt.hash(user.password, 10, function (err, hashedPassword) {
			if (err) return callback(err);

			const query =
				"INSERT INTO users(email, username) VALUES ($1, $2, $3)";
			client.query(
				query,
				[user.email, user.username, hashedPassword],
				function (err, result) {
					// NOTE: always call `done()` here to close
					// the connection to the database
					done();

					return callback(err);
				}
			);
		});
	}); 
	*/
}
