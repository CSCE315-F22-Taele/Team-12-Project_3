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
