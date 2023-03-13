const fs = require('fs');

const { Builder, Capabilities } = require('selenium-webdriver');

const Elements = require('./elements');

function getDriver() {
  return new Builder().withCapabilities(Capabilities.chrome()).build();
}

class BaseLinkedInBot {
  constructor(token, driver) {
    this.token = token;
    this.driver = driver;
  }

  async login() {
    this.driver.get('https://www.linkedin.com');
    await this.driver.manage().addCookie({ name: 'li_at', value: this.token });
    this.driver.navigate().refresh();
  }

  async sendKeys(element, keys, waitTime = 50) {
    for (let num = 0; num < keys.length; num += 1) {
      await element.sendKeys(keys[num]);
      await this.driver.sleep(waitTime);
    }
  }

  static readTxtFile(fileName) {
    let fileData = fs.readFileSync(fileName, 'utf-8');
    fileData = fileData.split('\n');
    if (!fileData[fileData.length - 1]) {
      fileData.pop();
    }
    return fileData;
  }

  static writeTxtFile(fileName, data) {
    const string = data.join('\n');
    fs.writeFileSync(fileName, string);
  }

  async scroll(x = 0, y = 500) {
    await this.driver.executeScript(`window.scrollTo(${x}, ${y});`);
  }

  async goToNextPage() {
    await this.scroll(0, 2500);
    await this.driver.sleep(1000);
    let nextBtn;
    try {
      nextBtn = await Elements.nextButton(this.driver);
    } catch {
      return false;
    }
    await nextBtn.click();
    await this.driver.sleep(3000);

    try {
      await nextBtn.getAttribute('disabled');
      return false;
    } catch (err) {
      return true;
    }
  }

  async quit() {
    await this.driver.quit();
  }
}

module.exports = {
  BaseLinkedInBot,
  getDriver,
};
