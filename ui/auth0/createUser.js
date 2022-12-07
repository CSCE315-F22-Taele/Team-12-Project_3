function create(user, callback) {
	// given user.email, user.username, user.password

	const axios = require("axios");
	const data = JSON.stringify({
		email: user.email,
		password: user.password,
		userName: user.username,
		userType: 0,
	});

	axios({
		method: "POST",
		url: "http://127.0.0.1/api/user",
		headers: {
			"Content-Type": "application/json",
		},
		data: data,
	}).catch((err) => {
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
