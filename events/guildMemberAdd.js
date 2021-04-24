module.exports = (client, member) => {
  client.channels.cache.get(client.config.userAmountChannelId).setName(`Liczba użytkowników: ${member.guild.members.cache.filter((m) => !m.user.bot).size}`);
  client.channels.cache.get(client.config.botAmountChannelId).setName(`Liczba botów: ${member.guild.members.cache.filter((m) => m.user.bot).size}`);

  member.guild.channels.cache.get(client.config.welcomeChannelId).send(`Cześć, ${member}! Baw się dobrze na ${member.guild.name}.\nJak już tu jesteś to zajrzyj też na kanał ${client.channels.cache.get(client.config.roleReactionsChannelId)}!`);
  member.guild.channels.cache.get(client.config.logsChannelId).send(`${member} wszedł na serwer o \`${client.formatDate(new Date(), 'HH:mm:ss dd.MM.yyyy')}\` ${member.guild.roles.cache.get(client.config.adminRoleId)}`);
  member.roles.add(member.guild.roles.cache.get(client.config.widzRoleId));
};
