const path = require('path');

const { BaseLinkedInBot } = require('./base');
const Elements = require('./elements');

class Search extends BaseLinkedInBot {
  async crawlPeopleSearchPageLinks(data) {
    const people = await Elements.allPeopleFromSearchPage(this.driver);
    const headless = 'https://www.linkedin.com/search/results/people/headless';
    for (let i = 0; i < people.length; i += 1) {
      const href = await Elements.getHref(people[i]);
      if (!href.startsWith(headless)) {
        data.push(href);
      }
    }
  }

  async searchPeople(dataPath, link, startPage = 1, maxPages = 10) {
    await this.driver.get(`${link}&page=${startPage}`);
    this.driver.sleep(3000);
    const linksPath = path.join(dataPath, 'autoconnect.txt');
    let totalCrawledPages = 0;
    const links = BaseLinkedInBot.readTxtFile(linksPath);
    let nextPageExists = true;

    while (totalCrawledPages < maxPages && nextPageExists) {
      await this.crawlPeopleSearchPageLinks(links);
      nextPageExists = await this.goToNextPage();
      totalCrawledPages += 1;
    }

    BaseLinkedInBot.writeTxtFile(linksPath, links);
  }
}

module.exports = Search;
