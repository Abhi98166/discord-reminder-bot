const cron = require('node-cron');
const Reminder = require('../models/reminderModel')
const moment = require('moment');


function scheduleReminders(client) {
    // Fetch all reminders
    console.log("Scheduling reminders using cron.");

    Reminder.findAll().then((reminders) => {
      reminders.forEach((reminder) => {
        const currentTime = moment().tz('Asia/Kolkata');
        const reminderTime = moment.tz(reminder.time, 'YYYY-MM-DD h:mm A', 'Asia/Kolkata');

        if (reminderTime.isAfter(currentTime)) {
          const cronTime = `${reminderTime.minute()} ${reminderTime.hour()} ${reminderTime.date()} ${reminderTime.month() + 1} *`;
          console.log(`Cron schedule: ${cronTime}`);

          // Schedule the reminder
          cron.schedule(cronTime, async () => {
            const channel = await client.channels.fetch(reminder.channelId);
            console.log("Cron is ready to send messages")
            if (channel) {
              channel.send(`Reminder: <@${reminder.userId}>, don't forget to ${reminder.task}!`);
            }
            // Delete the reminder from the database after it has been sent
            console.log("removing reminders after sending")
            await reminder.destroy();
          }, {
            timezone: 'Asia/Kolkata'
          });
        } else {
          // Remove past reminders
          console.log("removing old reminders")
          reminder.destroy();
        }
      });
    });

    console.log("All done OK.");
}

module.exports = scheduleReminders;