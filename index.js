const { Markup, session } = require('telegraf');

const Telegraf = require('telegraf')

const stage = require('./stages');


const express = require('express');

const BOT_TOKEN = process.env.BOT_TOKEN;
const URL = process.env.URL || 'https://protected-taiga-25874.herokuapp.com';
const PORT = process.env.PORT || 2000;

const app = new Telegraf(BOT_TOKEN);
const expressApp = express();


// app.telegram.setWebhook(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${URL}`)

app.telegram.setWebhook(`${URL}/bot${BOT_TOKEN}`);

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

// app.startWebhook(`/bot${BOT_TOKEN}`, null, PORT)

expressApp.use(app.webhookCallback(`/bot${BOT_TOKEN}`));

expressApp.get('/', (req, res) => {
  res.send('Hello World!');
});
expressApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// app.launch(); // Start polling bot from you computer