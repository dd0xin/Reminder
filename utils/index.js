const schedule = require("node-schedule");

const isValidTime = time => /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(time);

const generateID = () =>
  Math.random()
    .toString(36)
		.substr(2, 15);

const wakeUpHeroku = (minutes, callback) => {
	schedule.scheduleJob(
		{ minute: minutes },
		() => callback()
	);
}

module.exports = {
	isValidTime,
	generateID,
	wakeUpHeroku
}