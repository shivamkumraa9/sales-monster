module.exports = {
  clickConnectBtnInsideOptions(driver) {
    return driver.executeScript('document.querySelector(".artdeco-card").querySelector(`[type="connect"]`).click()');
  },

  clickOtherOption(driver) {
    return driver.executeScript('document.querySelector(`[aria-label="Other"]`).click()');
  },

  clickConnect(driver) {
    return driver.executeScript('document.querySelector(`[aria-label="Connect"]`).click()');
  },

  clickNext(driver) {
    return driver.executeScript('return document.querySelector(`[aria-label="Next"]`)');
  },
};
