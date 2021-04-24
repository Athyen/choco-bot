const Discord = require('discord.js');
const { readdir } = require('fs/promises'); // eslint-disable-line import/no-unresolved
const { polishPlurals } = require('polish-plurals');
const Enmap = require('enmap');

const client = new Discord.Client();
const config = require('./config.json');
client.logger = require('./modules/logger.js');
require('./modules/functions.js')(client);

client.config = config;
client.queue = [];
client.speaking = false;
client.twitch = new Enmap({ name: 'twitch' });

async function init() {
  const eventFiles = await readdir('./events');
  client.logger.log(`Ładuję ${eventFiles.length} ${polishPlurals('event', 'eventy', 'eventów', eventFiles.length)}.`);
  eventFiles.forEach((file) => {
    const [eventName] = file.split('.');
    client.logger.log(`Ładuję event: ${eventName}`);
    const event = require(`./events/${file}`); // eslint-disable-line import/no-dynamic-require, global-require
    client.on(eventName, event.bind(null, client));
  });

  client.login(config.discordBotToken);
}

init();
