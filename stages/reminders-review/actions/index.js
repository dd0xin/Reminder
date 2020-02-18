const { Markup, Composer } = require('telegraf');

const stepHandler = new Composer();

stepHandler.action(/cancel(\s.+)?/, ctx => {
  const deletedItemID = ctx.match[1].trim();
  const updatedReminders = ctx.session.reminders.filter(task => {
    if (task.id === deletedItemID) {
      task.cancel();
      return;
    }
    return task;
  })
  ctx.session.reminders = [ ...updatedReminders ];
  ctx.reply(
    "Reminder was successfully canceled!",
    Markup.inlineKeyboard([
      Markup.callbackButton("Add Reminder", "ADD_REMINDER"),
      Markup.callbackButton("See Saved Reminders", "SEE_SAVED_REMINDERS")
    ]).extra()
  );
  return ctx.wizard.next();
});

module.exports = stepHandler;