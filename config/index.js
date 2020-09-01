require('dotenv').config();


const BOT_TOKEN = process.env.BOT_TOKEN;
const URL = process.env.URL || 'https://reminder-bot-telegraf.herokuapp.com/';
const PORT = process.env.PORT || 5000;

module.exports = {
	BOT_TOKEN,
	URL,
	PORT
}
