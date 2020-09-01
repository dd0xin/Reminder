const { BOT_TOKEN, URL, PORT } = require('./index');
const { wakeUpHeroku } = require('../utils');

const launchApp = (app) => {
	if (process.env.NODE_ENV === 'development') {
		// Start polling bot from you computer
		return app.launch();
	}

	wakeUpHeroku(10);

	app.telegram.setWebhook(`${URL}/bot${BOT_TOKEN}`);
	app.startWebhook(`/bot${BOT_TOKEN}`, null, PORT);

}

module.exports = {
	launchApp,
};
