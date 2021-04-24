module.exports = (client, oldMember, newMember) => {
  if (oldMember?.nickname !== newMember?.nickname) client.logger.log(`Zmiana nicku użytkownika: ${oldMember?.nickname} => ${newMember?.nickname}`);
};
