module.exports = (client, reaction, user) => {
  if (reaction.message.id !== client.config.roleReactionsMessageId) return;
  switch (reaction.emoji.name) {
    case 'humanfallflat':
      client.removeRole(user.id, 'Human Fall Flat');
      break;
    case 'overwatch':
      client.removeRole(user.id, 'Overwatch');
      break;
    case 'phasmophobia':
      client.removeRole(user.id, 'Phasmophobia');
      break;
    case 'rocketleague':
      client.removeRole(user.id, 'Rocket League');
      break;
    case '18plus':
      client.removeRole(user.id, '18+');
      break;
    case '18minus':
      client.removeRole(user.id, '18-');
      break;
    case '👦':
      client.removeRole(user.id, 'Chłopiec');
      break;
    case '👧':
      client.removeRole(user.id, 'Dziewczyna');
      break;
    default: throw new Error('Niewspierana emotka');
  }
};
