module.exports = async (client, error) => {
  client.logger.error(`Błąd Discord.js: \n${JSON.stringify(error)}`);
};
