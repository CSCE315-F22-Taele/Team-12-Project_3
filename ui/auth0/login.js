function login(email, password, callback) {
	const axios = require("axios");
	const data = JSON.stringify({
		email: email,
		password: password,
	});

	axios({
		method: "POST",
		url: "http://127.0.0.1/api/login",
		headers: {
			"Content-Type": "application/json",
		},
		data: data,
	})
		.then((r) => {
			return callback(null, {
				id: r.data.id,
				username: r.data.userName,
				email: r.data.email,
				type: r.data.userType,
			});
		})
		.catch((err) => {
			if (err.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx

				return callback(err.response.status);
			} else if (err.request) {
				// The request was made but no response was received
				// `err.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js

				return callback(err.request);
			} else {
				// Something happened in setting up the request that triggered an err
				return callback(err.message);
			}
		});
}

async function loginAsync(email, password, callback) {
	const axios = require("axios");

	let response;

	try {
		response = await axios.post(
			//store API url in connection settings to better support SDLC environments
			configuration.baseAPIUrl + "/login",
			//user credentials passed as request body
			{
				email: email,
				password: password,
			},
			{
				timeout: 10000, //end call gracefully if request times out so script can do necessary callback
			}
		);
	} catch (e) {
		if (e.response.status === 401) {
			//assuming api returns 404 when email/username/password invalid
			return callback(
				new WrongUsernameOrPasswordError(
					email,
					"Invalid credentials provided."
				)
			);
		}
		//callback for any other error type
		return callback(new Error(e.message));
	}

	try {
		let user = response.data;

		//if using multiple custom db connections in your tenant prefix the
		//user_id with a connection specific key ex: "connName|" + user.user_id
		//this ensures unique user ids across all db connections
		return callback(null, {
			id: user.id,
			email: user.email,
			username: user.userName,
			type: user.userType,
		});
	} catch (e) {
		return callback(new Error(e.message));
	}
}
