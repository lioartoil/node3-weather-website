const request = require('request');

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoibGlvYXJ0b2lsIiwiYSI6ImNqdXJ2ODVxejF1ejc0MHBucGVpN29xd2YifQ.lTVEHbnR-jf-k7dlwcEFpQ&limit=1`;

	request({ url, json: true }, (err, res, { features }) => {
		if (err) {
			return callback('Unable to connect to location services!');
		}

		if (!features.length) {
			return callback('Unable to find location. Try another search.');
		}

		const { place_name: location, center } = features[0];
		const [longitude, latitude] = center;

		callback(undefined, { latitude, longitude, location });
	});
};

module.exports = geocode;
