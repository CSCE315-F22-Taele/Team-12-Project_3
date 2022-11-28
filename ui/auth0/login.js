function login(email, password, callback) {
	//this example uses the "pg" library
	//more info here: https://github.com/brianc/node-postgres

	const bcrypt = require("bcrypt");
	const postgres = require("pg");

	// call login API
	// given email and password, get user object

	/*
	const conString =
		"postgresql://csce315_912_cherian:830002546@csce-315-db.engr.tamu.edu/csce315_912_12";
	postgres.connect(conString, function (err, client, done) {
		if (err) return callback(err);

		const query =
			"SELECT u.id, u.username, u.email, c.password, (SELECT type FROM user_types WHERE id = u.user_type) as type FROM users u LEFT JOIN credentials c ON c.id = u.id WHERE email = $1";
		client.query(query, [email], function (err, result) {
			// NOTE: always call `done()` here to close
			// the connection to the database
			done();

			if (err || result.rows.length === 0)
				return callback(err || new WrongUsernameOrPasswordError(email));

			const user = result.rows[0];

			bcrypt.compare(password, user.password, function (err, isValid) {
				if (err || !isValid)
					return callback(
						err || new WrongUsernameOrPasswordError(email)
					);

				return callback(null, {
					id: user.id,
					username: user.username,
					email: user.email,
					type: user.type,
				});
			});
		});
	});
	*/
}
