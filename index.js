const countries = require('./countries');
const { getFlagEmoji, getFlagImageUrl, getCountrySelectHTML } = require('./utils');
const reactFramework = require('./frameworks/react');
const angularFramework = require('./frameworks/angular');
const vanillaFramework = require('./frameworks/vanilla');

/**
 * Returns an array of all countries with name, code and flag emoji
 * @returns {Array<{name: string, code: string, flag: string}>} Array of country objects
 */
function getAllCountries() {
  return countries.map(country => ({
    name: country.name,
    code: country.code,
    flag: getFlagEmoji(country.code)
  }));
}

/**
 * Generates HTML for a select dropdown with country flags and names
 * @param {Object} [options] - Configuration options
 * @param {string} [options.id] - HTML id attribute for the select element
 * @param {string} [options.name] - HTML name attribute for the select element
 * @param {string} [options.className] - HTML class attribute for the select element
 * @param {string} [options.selectedCode] - Country code to be selected by default
 * @param {boolean} [options.useImageFlags=true] - Whether to use image flags instead of emoji flags
 * @param {number} [options.flagWidth=40] - Width of flag images in pixels
 * @returns {string} HTML string for the country select dropdown
 */
function getCountrySelect(options = {}) {
  return getCountrySelectHTML(getAllCountries(), options);
}

// Make sure all utilities are explicitly exported
module.exports = {
  getAllCountries,
  getFlagEmoji,
  getFlagImageUrl,
  getCountrySelect,
  
  // Framework-specific utilities
  react: reactFramework,
  angular: angularFramework,
  vanilla: vanillaFramework
};
