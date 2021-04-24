module.exports = (client, oldUser, newUser) => {
  if (oldUser.username !== newUser.username) client.logger.log(`Zmiana nazwy użytkownika: ${oldUser.username} => ${newUser.username}`);
};
