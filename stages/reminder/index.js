const { Markup } = require("telegraf");
const WizardScene = require("telegraf/scenes/wizard");
const Scheduler = require('../../schedule/Sheduler');

const stepHandler = require('./actions');

const { isValidTime } = require('../../utils');


const createReminder = new WizardScene(
  "create-reminder",
  ctx => {
    const { session: { reminders } } = ctx;
    ctx.session.reminders = reminders ? [...reminders ] : [];
    ctx.reply("Enter reminder subject.");
    ctx.wizard.state.task = {};
    return ctx.wizard.next();
  },
  ctx => {
    if (!ctx.message) {
      return ctx.reply("Enter reminder subject.");
    }
    ctx.wizard.state.task.title = ctx.message.text;
    ctx.reply(
      "Enter interval for reminder: ",
      Markup.inlineKeyboard([
        [Markup.callbackButton("Every day", "limit day")],
        [Markup.callbackButton("Only once", "limit once")]
      ]).extra()
    );
    return ctx.wizard.next();
  },
  stepHandler,
  ctx => {
    try {
      if (!ctx.message || !isValidTime(ctx.message.text)) {
        return ctx.reply("Please enter valid time!");
      }
      const { task } = ctx.wizard.state;
      const [ hour, minute ] = ctx.message.text.split(":");
      ctx.wizard.state.task = { ...task, hour, minute };
      const reminder = new Scheduler({
        ...task,
        hour,
        minute,
        scheduleCallback: () => {
          ctx.reply(reminder.title);
          if (reminder.limit === 'once') {
            ctx.session.reminders = ctx.session.reminders.filter(savedReminders => savedReminders.id !== reminder.id);
          }
        }
      });
      reminder.start();
      ctx.session.reminders.push(reminder);
      ctx.reply(
        "Reminder have just started! Would you like to add another one?",
        Markup.inlineKeyboard([
          [Markup.callbackButton("Yes", "ADD_NEW_REMINDER")],
          [Markup.callbackButton("No", "LEAVE_SCENE")]
        ]).extra()
      );
      return ctx.wizard.next();
    } catch(error) {
      console.log(error);
    }
  },
  stepHandler
);

module.exports = createReminder;
