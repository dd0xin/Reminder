const dotenv = require('dotenv');

const { Markup, session } = require('telegraf');
const Telegraf = require('telegraf')
const stage = require('./stages');

const { wakeUpHeroku } = require('./utils');

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const URL = process.env.URL || 'https://reminder-bot-telegraf.herokuapp.com/';
const PORT = process.env.PORT || 5000;

const app = new Telegraf(BOT_TOKEN);

app.use(session());

app.catch((err, ctx) => {
	ctx.reply(
		`Ooops, something went wrong. Please, try again. ${err}`,
		Markup.inlineKeyboard([
			Markup.callbackButton("Add Reminder", "ADD_REMINDER"),
      Markup.callbackButton("See Saved Reminders", "SEE_SAVED_REMINDERS")
    ]).extra()
	)
})

// Start Bot
app.start(ctx => {
	try {
		ctx.reply(
			`How can I help you, ${ctx.from.first_name}?`,
			Markup.inlineKeyboard([
				Markup.callbackButton("Add Reminder", "ADD_REMINDER"),
				Markup.callbackButton("See Saved Reminders", "SEE_SAVED_REMINDERS")
			]).extra()
		);
	} catch (error) {
    console.log("error when started: ", error)
	}
});

app.use(stage.middleware());

wakeUpHeroku(10);

app.telegram.setWebhook(`${URL}/bot${BOT_TOKEN}`);
app.startWebhook(`/bot${BOT_TOKEN}`, null, PORT);
console.log("URL", URL)
console.log("BOT_TOKEN", BOT_TOKEN)

console.log('everything is ok')

// app.launch(); // Start polling bot from you computer
