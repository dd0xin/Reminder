const { BOT_TOKEN, URL, PORT } = require('./config');

const { Markup, session } = require('telegraf');
const Telegraf = require('telegraf')
const stage = require('./stages');

const { wakeUpHeroku } = require('./utils');

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
	ctx.reply(
		`How can I help you, ${ctx.from.first_name}?`,
		Markup.inlineKeyboard([
			Markup.callbackButton("Add Reminder", "ADD_REMINDER"),
			Markup.callbackButton("See Saved Reminders", "SEE_SAVED_REMINDERS")
		]).extra()
	);
});

app.use(stage.middleware());

wakeUpHeroku(10);

app.telegram.setWebhook(`${URL}/bot${BOT_TOKEN}`);
app.startWebhook(`/bot${BOT_TOKEN}`, null, PORT);

// app.launch(); // Start polling bot from you computer
