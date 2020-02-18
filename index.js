const { Markup, session, Telegraf } = require('telegraf');

const stage = require('./stages');

const app = new Telegraf(process.env.BOT_TOKEN);

const BOT_TOKEN = process.env.BOT_TOKEN;
const URL = process.env.URL;
const PORT = process.env.PORT || 2000;

app.telegram.setWebhook(`${URL}bot${BOT_TOKEN}`)
app.startWebhook(`/bot${BOT_TOKEN}`, null, PORT)

app.use(session());

app.catch((err, ctx) => {
	ctx.reply(
		`Ooops, something went wrong. Please, try again.`,
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

// app.launch(); // Start polling bot from you computer