const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', e => {
	e.preventDefault();

	const { value: location } = search;

	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';

	fetch(`/weather?address=${location}`).then(response => {
		response.json().then(({ error, location, forecast }) => {
			if (error) {
				messageOne.textContent = error;
				return;
			}

			messageOne.textContent = location;
			messageTwo.textContent = forecast;
		});
	});
});
