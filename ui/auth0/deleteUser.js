function remove(id, callback) {
	//this example uses the "pg" library
	//more info here: https://github.com/brianc/node-postgres

	// delete a user from auth0 side
	// given id

	/* 
	const postgres = require("pg");

	const conString = "postgres://user:pass@localhost/mydb";
	postgres.connect(conString, function (err, client, done) {
		if (err) return callback(err);

		const query = "DELETE FROM users WHERE id = $1";
		client.query(query, [id], function (err) {
			// NOTE: always call `done()` here to close
			// the connection to the database
			done();

			return callback(err);
		});
	});
	*/
}
