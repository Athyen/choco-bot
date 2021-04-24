module.exports = (client, reaction, user) => {
  if (reaction.message.id !== client.config.roleReactionsMessageId) return;
  switch (reaction.emoji.name) {
    case 'humanfallflat':
      client.addRole(user.id, 'Human Fall Flat');
      break;
    case 'overwatch':
      client.addRole(user.id, 'Overwatch');
      break;
    case 'phasmophobia':
      client.addRole(user.id, 'Phasmophobia');
      break;
    case 'rocketleague':
      client.addRole(user.id, 'Rocket League');
      break;
    case '18plus':
      client.addRole(user.id, '18+');
      break;
    case '18minus':
      client.addRole(user.id, '18-');
      break;
    case '👦':
      client.addRole(user.id, 'Chłopiec');
      break;
    case '👧':
      client.addRole(user.id, 'Dziewczyna');
      break;
    default: throw new Error('Niewspierana emotka');
  }
};
