const schedule = require("node-schedule");

const { generateID } = require('../../utils');

class Scheduler {
  constructor({ title, limit, hour, minute, scheduleCallback }) {
    this.title = title;
    this.limit = limit;
    this.hour = hour;
    this.minute = minute;
    this.scheduleCallback = scheduleCallback;
    this.id = generateID();
    this.job = null;
  }

  get() {
    return {
      id: this.id,
      title: this.title,
      time: `${this.hour}:${this.minute}`
    };
  }

  everyDayReminde() {
    this.job = schedule.scheduleJob(
      { hour: this.hour, minute: this.minute },
      fireDate => this.scheduleCallback(fireDate)
    );
  }

  start() {
    if (this.limit === "day") {
      this.everyDayReminde();
    } else {
      this.onceReminde();
    }
  }

  onceReminde() {
    this.job = schedule.scheduleJob(
      { hour: this.hour, minute: this.minute },
      fireDate => {
        this.scheduleCallback(fireDate);
        this.job.cancel();
      }
    );
  }

  cancel() {
    if (this.job) {
      this.job.cancel();
    }
  }
}
