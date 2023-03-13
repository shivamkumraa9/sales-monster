const { By } = require('selenium-webdriver');

module.exports = {
  loginPageUsernameField(driver) {
    return driver.findElement(By.id('username'));
  },

  loginPagePasswordField(driver) {
    return driver.findElement(By.id('password'));
  },

  primaryLargeButton(driver) {
    return driver.findElement(By.className('btn__primary--large'));
  },

  nameText(driver) {
    return driver.findElement(By.className('text-heading-xlarge'));
  },

  companyNameText(driver) {
    return driver.findElement(By.className('pv-text-details__right-panel-item-link'));
  },

  profileCard(driver) {
    return driver.findElement(By.className('artdeco-card'));
  },

  connectBtn(driver) {
    return driver.findElement(By.className('artdeco-button--primary'));
  },

  connectOptions(driver) {
    return driver.findElement(By.className('artdeco-dropdown__trigger'));
  },

  AddNote(driver) {
    return driver.findElement(By.xpath("//button[@aria-label='Add a note']"));
  },

  noteTextBox(driver) {
    return driver.findElement(By.id('custom-message'));
  },

  sendButton(driver) {
    return driver.findElement(By.xpath("//button[@aria-label='Send now']"));
  },

  allPeopleFromSearchPage(driver) {
    return driver.findElements(By.className('entity-result__title-text'));
  },

  getHref(driver) {
    return driver.findElement(By.tagName('a')).getAttribute('href');
  },

  nextButton(driver) {
    return driver.findElement(By.xpath('//button[@aria-label="Next"]'));
  },
};
