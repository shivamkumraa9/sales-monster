/* eslint-disable no-param-reassign */
const path = require('path');

const { BaseLinkedInBot } = require('./base');
const Elements = require('./elements');
const Scripts = require('./scripts');

class Connector extends BaseLinkedInBot {
  async sendConnectionRequest(link, msg = null) {
    await this.driver.get(link);

    await this.driver.sleep(1000);
    await this.scroll(0, 500);
    await this.driver.sleep(1000);
    await this.scroll(500, 0);

    if (msg) {
      const name = await Elements.nameText(this.driver);
      const nameText = await name.getText();
      if (msg.includes('{{ firstName }}')) {
        msg = msg.replaceAll('{{ firstName }}', nameText.split(' ')[0]);
      }
      if (msg.includes('{{ lastName }}')) {
        msg = msg.replaceAll('{{ lastName }}', nameText.split(' ')[1]);
      }
      if (msg.includes('{{ company }}')) {
        const company = await Elements.companyNameText(this.driver);
        const companyText = await company.getText();
        msg = msg.replaceAll('{{ company }}', companyText);
      }
    }

    const profileCard = await Elements.profileCard(this.driver);

    try {
      const connectBtn = await Elements.connectBtn(profileCard);
      if (await connectBtn.getText() === 'Connect') {
        await connectBtn.click();
      } else {
        throw Error('Connect Button Not Found');
      }
    } catch (err) {
      const options = await Elements.connectOptions(profileCard);
      await this.driver.sleep(1000);
      await options.click();
      await this.driver.sleep(2000);
      try {
        await Scripts.clickConnectBtnInsideOptions(this.driver);
      } catch (err2) {
        throw Error('Connect Button Not Found');
      }
    }

    try {
      await Scripts.clickOtherOption(this.driver);
      await Scripts.clickConnect(this.driver);
    // eslint-disable-next-line no-empty
    } catch (err) {}

    if (msg) {
      const addNote = await Elements.AddNote(this.driver);
      await addNote.click();
      this.driver.sleep(1000);
      const noteTextBox = await Elements.noteTextBox(this.driver);
      await this.sendKeys(noteTextBox, msg);
      this.driver.sleep(1000);
    }

    const connectBtn = await Elements.sendButton(this.driver);
    await connectBtn.click();
  }

  async autoconnect(dataPath, msg = null, maxRequests = 20) {
    const linksPath = path.join(dataPath, 'autoconnect.txt');
    const successPath = path.join(dataPath, 'autoconnect_success.txt');
    const failedPath = path.join(dataPath, 'autoconnect_failed.txt');

    const links = BaseLinkedInBot.readTxtFile(linksPath);
    const success = BaseLinkedInBot.readTxtFile(successPath);
    const failed = BaseLinkedInBot.readTxtFile(failedPath);

    const reqLinks = links.splice(0, Math.min(maxRequests, links.length));

    for (let i = 0; i < reqLinks.length; i += 1) {
      const link = reqLinks[i];
      try {
        await this.sendConnectionRequest(link, msg);
        await this.driver.sleep(5000);
        success.push(link);
      } catch (err) {
        console.log(link, err);
        failed.push(link);
      }
    }

    BaseLinkedInBot.writeTxtFile(linksPath, links);
    BaseLinkedInBot.writeTxtFile(successPath, success);
    BaseLinkedInBot.writeTxtFile(failedPath, failed);
  }
}

module.exports = Connector;
