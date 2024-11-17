const parseReminder = require('../controllers/reminderController')
const scheduleReminders = require('../services/scheduleService');
const moment = require('moment');
const Reminder = require('../models/reminderModel')


// Listen for messages
module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        // Ignore bot messages

        if (message.author.bot) return;

        if (message.content.toLowerCase().startsWith('remind me to')) {
        const reminderDetails = parseReminder(message.content);

        if (reminderDetails) {
            const { task, time } = reminderDetails;

            const currentTime = moment();
            const reminderTime = moment(time, 'YYYY-MM-DD h:mm A');

            if (reminderTime.isBefore(currentTime)) {
            message.channel.send(
                "That time has already passed today. Please set a future time."
            );
            } else {
            await Reminder.create({
                task,
                time: reminderTime.format('YYYY-MM-DD h:mm A'),
                userId: message.author.id,
                channelId: message.channel.id,
            });

            message.channel.send(
                `Okay! I'll remind you to ${task} at ${reminderTime.format(
                'h:mm A'
                )} on ${reminderTime.format('YYYY-MM-DD')}.`
            );
            scheduleReminders(client);
            }
        } else {
            message.channel.send(
            "I couldn't understand the reminder. Please use the format: 'remind me to [task] at [time]' with an AM or PM."
            );
        }
        }
    });
};