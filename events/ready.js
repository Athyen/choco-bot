/* eslint-disable no-await-in-loop */
const Discord = require('discord.js');
const schedule = require('node-schedule');
const { v4: uuid } = require('uuid');
const { ApiClient } = require('twitch');
const { ClientCredentialsAuthProvider } = require('twitch-auth');
const { polishPlurals } = require('polish-plurals');

module.exports = async (client) => {
  const authProvider = new ClientCredentialsAuthProvider(client.config.twitchApiClientId, client.config.twitchApiClientSecret);
  const twitchApiClient = new ApiClient({ authProvider });

  client.logger.ready(`${client.user.username} jest gotowy do obsługi ${client.users.cache.size} ${polishPlurals('użytkownika', 'użytkowników', 'użytkowników', client.users.cache.size)} na ${client.guilds.cache.size} ${polishPlurals('serwerze', 'serwarach', 'serwarach', client.guilds.cache.size)}.`);
  client.user.setActivity('Czekoladowy pudding', { type: 'PLAYING' });

  client.channels.cache.get(client.config.roleReactionsChannelId).messages.fetch(client.config.roleReactionsMessageId);
  client.channels.cache.get(client.config.userAmountChannelId).setName(`Liczba użytkowników: ${client.guilds.cache.get(client.config.chocoholicsGuildId).members.cache.filter((member) => !member.user.bot).size}`);
  client.channels.cache.get(client.config.botAmountChannelId).setName(`Liczba botów: ${client.guilds.cache.get(client.config.chocoholicsGuildId).members.cache.filter((member) => member.user.bot).size}`);

  schedule.scheduleJob('* * * * *', async () => {
    const streams = (await twitchApiClient.helix.streams.getStreams({ userId: Array.from(client.twitch.keys()) })).data;
    for (const stream of streams) {
      if (!stream || client.twitch.get(stream.userId) === stream.id) continue; // eslint-disable-line no-continue
      try {
        const user = await stream.getUser();
        const embed = new Discord.MessageEmbed()
          .setTitle(stream.title)
          .setColor([100, 65, 164])
          .setThumbnail(user.profilePictureUrl)
          .setDescription(`https://twitch.tv/${stream.userName}`)
          .addField('Gra', (await stream.getGame()).name, true)
          .addField('Followers', (await twitchApiClient.helix.users.getFollows({ followedUser: stream.userId })).total, true)
          .addField('Wyświetlenia', user.views)
          .setImage(`${stream.getThumbnailUrl('640', '360')}?_=${uuid()}`)
          .setFooter(`Godzina rozpoczęcia - ${client.formatDate(stream.startDate, 'dd/MM/yyyy HH:mm:ss')}`, 'https://i.imgur.com/0VIHW9f.png');
        client.channels.cache.get(client.config.streamNotificationsChannelId).send(`${client.guilds.cache.get(client.config.chocoholicsGuildId).roles.cache.get(client.config.widzRoleId)} ${user.displayName} właśnie ${['Oiika'].includes(user.displayName) ? 'rozpoczęła' : 'rozpoczął'} stream!`, embed);
        client.twitch.set(stream.userId, stream.id);
      } catch (error) {
        client.logger.error(error);
      }
    }
  });

  schedule.scheduleJob('*/5 * * * *', () => {
    client.channels.cache.get(client.config.onlineUsersChannelId).setName(`Użytkownicy online: ${client.guilds.cache.get(client.config.chocoholicsGuildId).members.cache.filter((member) => member.presence.status !== 'offline' && !member.user.bot).size}`);
    client.channels.cache.get(client.config.offlineUsersChannelId).setName(`Użytkownicy offline: ${client.guilds.cache.get(client.config.chocoholicsGuildId).members.cache.filter((member) => member.presence.status === 'offline' && !member.user.bot).size}`);
  });

  schedule.scheduleJob('*/30 * * * *', async () => {
    client.channels.cache.get('623990487094657034').setName(`Liczba obserwujących: ${(await twitchApiClient.helix.users.getFollows({ followedUser: client.config.oiikaTwitchUserId })).total}`);
    client.channels.cache.get('623991340618874888').setName(`Liczba wyświetleń: ${(await twitchApiClient.helix.users.getUserById(client.config.oiikaTwitchUserId)).views}`);
  });

  // console.log(client.guilds.cache.get(client.config.chocoholicsGuildId).emojis.cache.map((emoji) => ({ id: emoji.id, name: emoji.name }))); // listowanie emotek
  // await (await client.channels.cache.get(client.config.roleReactionsChannelId).messages.fetch(client.config.roleReactionsMessageId)).react('🧒'); // dodawanie reakcji
};
