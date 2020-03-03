const schedule = require("node-schedule");

/**
 *
 * @param {string} time Time for validation
 */
const isValidTime = time => /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(time);

const generateID = () =>
  Math.random()
    .toString(36)
		.substr(2, 15);

/**
 *
 * Send a request to Heroku server to not allowed Heroku duno going sleep
 *
 * @param {number} minutes Integer number of minutes
 */
const wakeUpHeroku = (minutes) => {
	schedule.scheduleJob(
		`*/${minutes} * * * *`,
		async () => {
			try {
				await fetch('https://reminder-app-bot.herokuapp.com/');
				console.log(`${ctx.from.first_name}, wake up request have just sent to heroku`)

			} catch (error) {
				console.log(error);
			}
		}
	);
}

module.exports = {
	isValidTime,
	generateID,
	wakeUpHeroku,
}