const moment = require('moment');

function parseReminder(content) {
    const regex = /remind me to (.+) at (\d{1,2}:\d{2}\s?(?:am|pm))/i;
    const matches = content.match(regex);

    if (matches) {
      const task = matches[1];
      const time = matches[2];

      const reminderTime = moment().format('YYYY-MM-DD') + ' ' + time;
      const parsedTime = moment.tz(reminderTime, 'YYYY-MM-DD h:mm a', 'Asia/Kolkata');

      return { task, time: parsedTime };
    }

    return null;
}

module.exports = parseReminder;