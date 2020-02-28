const { Markup } = require("telegraf");

const getReminderActionsKeyboard = () => (
	Markup.inlineKeyboard([
		Markup.callbackButton("Add Reminder", "ADD_REMINDER"),
		Markup.callbackButton("See Saved Reminders", "SEE_SAVED_REMINDERS")
	]).extra()
)

module.exports = getReminderActionsKeyboard;