const { Markup, Stage } = require('telegraf');

const createReminder = require('./reminder');
const remindersReview = require('./reminders-review');


const stage = new Stage([createReminder, remindersReview]);

stage.action('ADD_REMINDER', (ctx) => {
	return ctx.scene.enter('create-reminder');
})

stage.action('SEE_SAVED_REMINDERS', (ctx) => {
	return ctx.scene.enter('reminders-review');
})

stage.action('LEAVE_SCENE', (ctx) => {
	ctx.reply(
		`What will be next, ${ctx.from.first_name}?`,
    Markup.inlineKeyboard([
			Markup.callbackButton("Add Reminder", "ADD_REMINDER"),
      Markup.callbackButton("See Saved Reminders", "SEE_SAVED_REMINDERS")
    ]).extra()
		);
	return ctx.scene.leave();
})

module.exports = stage;