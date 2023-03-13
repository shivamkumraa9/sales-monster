require('dotenv').config();

const path = require('path');

const { getDriver } = require('./linkedin/base');
const Search = require('./linkedin/search');
const Connect = require('./linkedin/connect');

const dataPath = path.join(__dirname, 'data');

module.exports = {
  async scrape() {
    const driver = await getDriver();
    const bot = new Search(process.env.email, process.env.password, driver);
    await bot.login();
    await bot.searchPeople(dataPath, process.env.link);
    await bot.quit();
  },

  async connect() {
    const driver = await getDriver();
    const bot = new Connect(process.env.token, driver);
    await bot.login();
    await bot.autoconnect(dataPath, 'hello {{ firstName }}');
    await bot.quit();
  },
};
