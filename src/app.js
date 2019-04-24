const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Define port
const port = 3000;

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Chanakan Nuekreo'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'Chanakan Nuekreo'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		helpText: 'This is some helpful text.',
		name: 'Chanakan Nuekreo'
	});
});

app.get('/weather', ({ query: { address } }, res) => {
	if (!address) {
		return res.send({ error: 'You must provide an address!' });
	}

	geocode(address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}

		forecast(latitude, longitude, (error, forecast) => {
			if (error) {
				return res.send({ error });
			}

			return res.send({ forecast, location, address });
		});
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({ error: 'You must provide a search term' });
	}

	console.log(req.query.search);
	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Help article not found.',
		name: 'Chanakan Nuekreo'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Page not found.',
		name: 'Chanakan Nuekreo'
	});
});

app.listen(port, () => console.log(`Server is up on port ${port}.`));
