const { Markup } = require("telegraf");
const Extra = require('telegraf/extra');
const WizardScene = require("telegraf/scenes/wizard");

const stepHandler = require('./actions');


const remindersReview = new WizardScene(
  "reminders-review",
  ctx => {
    const { session } = ctx;
    if (!session.reminders || !session.reminders.length) {
      ctx.reply(
        "You don't have any reminders",
        Markup.inlineKeyboard([
          Markup.callbackButton("Add Reminder", "ADD_REMINDER"),
          Markup.callbackButton("See Saved Reminders", "SEE_SAVED_REMINDERS")
        ]).extra()
      );
      return ctx.scene.leave();
    }
    const keyboard = session.reminders.map(({ id, title, hour, minute }) => Markup.callbackButton(`${title} on ${hour}:${minute}`, `cancel ${id}`));
    ctx.reply('Yours reminders. Tap on some to cancel:', Extra.HTML().markup((m) => m.inlineKeyboard(keyboard, { columns: 1 })));
    return ctx.wizard.next();
  },
  stepHandler,

);

module.exports = remindersReview;
