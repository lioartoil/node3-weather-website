const request = require('request');

const forecast = (lat, long, callback) => {
	const url = `https://api.darksky.net/forecast/29b6633b41a300b54ac71c93996a7d46/${lat},${long}?units=si`;

	request(
		{ url, json: true },
		(
			err,
			res,
			{ error, currently: { temperature, precipProbability }, daily: { data } }
		) => {
			if (err) {
				return callback('Unable to connect to weather service!');
			}

			if (error) {
				return callback('Unable to find location');
			}

			const { summary, temperatureMin: min, temperatureMax: max } = data[0];

			callback(
				undefined,
				`${summary} It is currently ${temperature} degrees out (range from ${min} - ${max} °C). There is a ${precipProbability *
					100}% chance of rain.`
			);
		}
	);
};

module.exports = forecast;
