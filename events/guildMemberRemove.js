module.exports = (client, member) => {
  client.channels.cache.get(client.config.userAmountChannelId).setName(`Liczba użytkowników: ${member.guild.members.cache.filter((m) => !m.user.bot).size}`);
  client.channels.cache.get(client.config.botAmountChannelId).setName(`Liczba botów: ${member.guild.members.cache.filter((m) => m.user.bot).size}`);

  member.guild.channels.cache.get(client.config.logsChannelId).send(`${member.user.username} ${member.nickname ? `(${member.nickname}) ` : ''}wyszedł z serwera o \`${client.formatDate(new Date(), 'HH:mm:ss dd.MM.yyyy')}\` ${member.guild.roles.cache.get(client.config.adminRoleId)}`);
};
