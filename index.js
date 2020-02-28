const { Markup, session } = require('telegraf');

const Telegraf = require('telegraf')

const stage = require('./stages');


const BOT_TOKEN = process.env.BOT_TOKEN;
console.log("TCL: BOT_TOKEN", BOT_TOKEN)
const URL = process.env.URL || 'https://protected-taiga-25874.herokuapp.com';
console.log("TCL: URL", URL)
const PORT = process.env.PORT || 2000;

const app = new Telegraf(BOT_TOKEN);

app.telegram.setWebhook(`${URL}bot${BOT_TOKEN}`)

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

app.startWebhook(`/bot${BOT_TOKEN}`, null, PORT)
// app.launch(); // Start polling bot from you computer