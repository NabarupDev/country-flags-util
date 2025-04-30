/**
 * Generates vanilla JavaScript code to create a country select dropdown
 * @param {Object} [options] - Configuration options
 * @param {string} [options.containerId='country-container'] - ID of the container element
 * @param {string} [options.selectId='country-select'] - ID of the select element
 * @param {string} [options.selectName='country'] - Name of the select element
 * @param {string} [options.selectClass=''] - CSS class for the select element
 * @param {string} [options.selectedCode=''] - Country code to be selected by default
 * @param {string} [options.onChangeFunction=''] - Name of the function to call on change
 * @param {boolean} [options.useImageFlags=true] - Whether to use image flags instead of emoji flags
 * @param {number} [options.flagWidth=40] - Width of flag images in pixels
 * @returns {string} JavaScript code to create a country select dropdown
 */
function getVanillaJsCode(options = {}) {
  const {
    containerId = 'country-container',
    selectId = 'country-select',
    selectName = 'country',
    selectClass = '',
    selectedCode = '',
    onChangeFunction = '',
    useImageFlags = true,
    flagWidth = 40
  } = options;

  const onChangeCode = onChangeFunction 
    ? `\n  countrySelect.addEventListener('change', ${onChangeFunction});` 
    : '';

  const flagDisplayCode = useImageFlags ? 
    `    // Create flag image
    const flagImg = document.createElement('img');
    flagImg.src = \`https://flagcdn.com/w\${${flagWidth}}/\${country.code.toLowerCase()}.png\`;
    flagImg.alt = country.code;
    flagImg.style.width = '${flagWidth}px';
    flagImg.style.marginRight = '5px';
    flagImg.style.verticalAlign = 'middle';
    
    option.innerHTML = '';
    option.appendChild(flagImg);
    option.appendChild(document.createTextNode(country.name));` :
    `    option.textContent = \`\${country.flag} \${country.name}\`;`;

  return `// Import the package in your project
// const { getAllCountries, getFlagImageUrl } = require('country-flags-util'); // For Node.js
// import { getAllCountries, getFlagImageUrl } from 'country-flags-util'; // For ES modules

document.addEventListener('DOMContentLoaded', function() {
  // Get the container element
  const container = document.getElementById('${containerId}');
  
  // Create select element
  const countrySelect = document.createElement('select');
  countrySelect.id = '${selectId}';
  countrySelect.name = '${selectName}';
  ${selectClass ? `countrySelect.className = '${selectClass}';` : ''}
  
  // Get all countries
  const countries = getAllCountries();
  
  // Add options for each country
  countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country.code;
    ${useImageFlags ?
      `// Create option with flag image
    const optionContainer = document.createElement('div');
    optionContainer.style.display = 'flex';
    optionContainer.style.alignItems = 'center';
    
    const flagImg = document.createElement('img');
    flagImg.src = getFlagImageUrl(country.code, ${flagWidth});
    flagImg.alt = country.code;
    flagImg.style.width = '${flagWidth}px';
    flagImg.style.marginRight = '5px';
    flagImg.style.verticalAlign = 'middle';
    
    optionContainer.appendChild(flagImg);
    optionContainer.appendChild(document.createTextNode(country.name));
    
    option.appendChild(optionContainer);` :
      `option.textContent = \`\${country.flag} \${country.name}\`;`}
    
    ${selectedCode ? `if(country.code === '${selectedCode}') option.selected = true;` : ''}
    countrySelect.appendChild(option);
  });
  
  // Add the select to the container
  container.appendChild(countrySelect);${onChangeCode}
});`;
}

/**
 * Generates complete HTML & JavaScript code for a country select dropdown
 * @param {Object} [options] - Configuration options similar to getVanillaJsCode
 * @returns {Object} Object with html and js properties containing the respective code
 */
function getVanillaImplementation(options = {}) {
  const { useImageFlags = true, flagWidth = 40 } = options;
  const jsCode = getVanillaJsCode({...options, useImageFlags, flagWidth});
  
  const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Country Select Example</title>
  <script src="path/to/country-flags-util.min.js"></script>
  <script>
    ${jsCode}
  </script>
  <style>
    /* Custom styling for select option */
    select option {
      display: flex;
      align-items: center;
      padding: 3px;
    }
  </style>
</head>
<body>
  <div id="${options.containerId || 'country-container'}"></div>
</body>
</html>`;

  return {
    html: htmlCode,
    js: jsCode
  };
}

module.exports = {
  getVanillaJsCode,
  getVanillaImplementation
};
