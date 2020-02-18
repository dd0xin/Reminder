const { Composer } = require('telegraf');

const stepHandler = new Composer();

stepHandler.action(/limit(\s.+)?/, ctx => {
  const limitType = ctx.match[1].trim();
  ctx.wizard.state.task.limit = limitType;
  ctx.reply("Enter time (expample HH:MM)");
  return ctx.wizard.next();
});

stepHandler.action("ADD_NEW_REMINDER", ctx => {
  ctx.reply("Enter reminder subject.");
  ctx.wizard.state.task = {};
  ctx.wizard.state.reminders = [];
  return ctx.wizard.selectStep(1);
});

module.exports = stepHandler;