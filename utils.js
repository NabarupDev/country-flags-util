/**
 * Converts a 2-letter ISO country code to an emoji flag
 * @param {string} code - The 2-letter ISO country code
 * @returns {string} The emoji flag
 */
function getFlagEmoji(code) {
  if (!code || typeof code !== 'string' || code.length !== 2) {
    return '';
  }
  
  // Regional Indicator Symbols are Unicode characters used to create flag emojis
  // Each letter in the country code is converted to a regional indicator symbol
  // by adding an offset to the Unicode code point
  const codePoints = code
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  
  return String.fromCodePoint(...codePoints);
}

/**
 * Gets the flag image URL for a country code using flagcdn.com
 * @param {string} code - The 2-letter ISO country code
 * @param {number} [width=40] - The width of the flag image in pixels
 * @returns {string} URL to the flag image
 */
function getFlagImageUrl(code, width = 40) {
  if (!code || typeof code !== 'string' || code.length !== 2) {
    return '';
  }
  
  return `https://flagcdn.com/w${width}/${code.toLowerCase()}.png`;
}

/**
 * Generates HTML for a select dropdown with country flags and names
 * @param {Array<{name: string, code: string, flag: string}>} countries - Array of country objects
 * @param {Object} [options] - Configuration options
 * @param {string} [options.id] - HTML id attribute for the select element
 * @param {string} [options.name] - HTML name attribute for the select element
 * @param {string} [options.className] - HTML class attribute for the select element
 * @param {string} [options.selectedCode] - Country code to be selected by default
 * @param {boolean} [options.useImageFlags=true] - Whether to use image flags instead of emoji flags
 * @param {number} [options.flagWidth=40] - Width of flag images in pixels
 * @returns {string} HTML string for the country select dropdown
 */
function getCountrySelectHTML(countries, options = {}) {
  if (!Array.isArray(countries)) {
    throw new Error('Countries must be an array');
  }
  
  const { 
    id = 'country-select', 
    name = 'country', 
    className = '', 
    selectedCode = '',
    useImageFlags = true,
    flagWidth = 40
  } = options;
  
  const optionsHTML = countries.map(({ code, name, flag }) => {
    const selected = code === selectedCode ? ' selected' : '';
    let flagDisplay;
    
    if (useImageFlags) {
      // Use image flag with consistent width
      const flagUrl = getFlagImageUrl(code, flagWidth);
      flagDisplay = `<img src="${flagUrl}" alt="${code}" style="vertical-align: middle; margin-right: 5px; width: ${flagWidth}px;">`;
    } else {
      // Use emoji flag
      flagDisplay = `${flag} `;
    }
    
    return `<option value="${code}"${selected}>${flagDisplay}${name}</option>`;
  }).join('\n  ');
  
  return `<select id="${id}" name="${name}" class="${className}">
  ${optionsHTML}
</select>`;
}

module.exports = {
  getFlagEmoji,
  getFlagImageUrl,
  getCountrySelectHTML
};
