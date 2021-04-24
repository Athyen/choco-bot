/* eslint-disable no-param-reassign */
const { format } = require('date-fns');

module.exports = (client) => {
  client.findRole = (roleName) => client.guilds.cache.get(client.config.chocoholicsGuildId).roles.cache.find((role) => role.name === roleName);

  client.addRole = (userId, roleName) => {
    client.guilds.cache.get(client.config.chocoholicsGuildId).members.cache.get(userId).roles.add(client.findRole(roleName));
  };

  client.removeRole = (userId, roleName) => {
    client.guilds.cache.get(client.config.chocoholicsGuildId).members.cache.get(userId).roles.remove(client.findRole(roleName));
  };

  client.formatDate = format;

  client.wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
};
