/**
 * Generates JSX code for a React country select component
 * @param {Array<{name: string, code: string, flag: string}>} countries - Array of country objects
 * @param {Object} [props] - React props for the select element
 * @param {boolean} [props.useImageFlags=true] - Whether to use image flags instead of emoji flags
 * @param {number} [props.flagWidth=40] - Width of flag images in pixels
 * @returns {string} JSX code string for the country select component
 */
function getReactCountrySelect(countries, props = {}) {
  if (!Array.isArray(countries)) {
    throw new Error('Countries must be an array');
  }

  const {
    id = 'country-select',
    name = 'country',
    className = '',
    defaultValue = '',
    onChange = 'handleChange',
    useImageFlags = true,
    flagWidth = 40,
    ...otherProps
  } = props;

  const propsString = Object.entries({
    id,
    name,
    className,
    defaultValue,
    onChange,
    ...otherProps
  })
    .filter(([_, value]) => value !== '')
    .map(([key, value]) => {
      // Check if it's an event handler or a string value
      return key.startsWith('on')
        ? `${key}={${value}}`
        : `${key}="${value}"`;
    })
    .join(' ');

  const optionsCode = countries
    .map(({ code, name, flag }) => {
      if (useImageFlags) {
        return `  <option key="${code}" value="${code}" style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
    <>
      <img 
        src={getFlagImageUrl("${code}", ${flagWidth})} 
        alt="${code}" 
        style={{ marginRight: '5px', width: '${flagWidth}px', verticalAlign: 'middle' }} 
      />
      {' ${name}'}
    </>
  </option>`;
      } else {
        return `  <option key="${code}" value="${code}">${flag} ${name}</option>`;
      }
    })
    .join('\n');

  return `// Don't forget to import getFlagImageUrl if using image flags
import { getFlagImageUrl } from 'country-flags-util';

<select ${propsString} style={{ padding: '8px' }}>
${optionsCode}
</select>`;
}

/**
 * Generates a complete React component for country selection
 * @param {string} [componentName='CountrySelect'] - Name of the component
 * @returns {string} React component code as a string
 */
function getReactCountryComponent(componentName = 'CountrySelect') {
  return `import React, { useState, useRef, useEffect } from 'react';
import { getAllCountries, getFlagImageUrl } from 'country-flags-util';

const ${componentName} = ({ 
  id = 'country-select', 
  name = 'country', 
  className = '', 
  defaultValue = '', 
  placeholder = 'Select a country',
  onChange = (value) => console.log(value),
  useImageFlags = true,
  flagWidth = 40,
  ...props 
}) => {
  const countries = getAllCountries();
  
  // State to track selected country
  const [selectedCountry, setSelectedCountry] = useState(defaultValue);
  // State to control dropdown open/closed
  const [isOpen, setIsOpen] = useState(false);
  // Reference to the dropdown container for click outside detection
  const dropdownRef = useRef(null);
  
  // Find the selected country object
  const selectedCountryObj = countries.find(country => country.code === selectedCountry) || 
    (defaultValue ? countries.find(country => country.code === defaultValue) : null);
  
  // Handle country selection
  const handleCountrySelect = (code) => {
    setSelectedCountry(code);
    setIsOpen(false);
    onChange(code);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Container styles
  const containerStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '400px',
    ...(props.style || {})
  };
  
  // Button styles
  const buttonStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '10px 15px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    cursor: 'pointer'
  };
  
  // Dropdown menu styles
  const dropdownStyle = {
    position: 'absolute',
    zIndex: 10,
    marginTop: '4px',
    width: '100%',
    maxHeight: '300px',
    overflowY: 'auto',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ccc'
  };
  
  // Flag image styles
  const flagStyle = {
    marginRight: '8px',
    width: \`\${flagWidth}px\`,
    height: 'auto',
    verticalAlign: 'middle'
  };
  
  return (
    <div id={id} ref={dropdownRef} className={className} style={containerStyle}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={buttonStyle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedCountryObj ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {useImageFlags && (
              <img 
                src={getFlagImageUrl(selectedCountryObj.code, flagWidth)} 
                alt={\`\${selectedCountryObj.code} flag\`}
                style={flagStyle}
              />
            )}
            {!useImageFlags && selectedCountryObj.flag && (
              <span style={{ marginRight: '8px' }}>{selectedCountryObj.flag}</span>
            )}
            <span>{selectedCountryObj.name}</span>
          </div>
        ) : (
          <span>{placeholder}</span>
        )}
        <span style={{ marginLeft: '8px' }}>▼</span>
      </button>
      
      {isOpen && (
        <div style={dropdownStyle} role="listbox">
          {countries.map(({ code, name, flag }) => (
            <div
              key={code}
              role="option"
              aria-selected={code === selectedCountry}
              style={{
                padding: '10px 15px',
                cursor: 'pointer',
                backgroundColor: code === selectedCountry ? '#f0f0f0' : 'transparent',
                display: 'flex',
                alignItems: 'center'
              }}
              onClick={() => handleCountrySelect(code)}
            >
              {useImageFlags ? (
                <img 
                  src={getFlagImageUrl(code, flagWidth)} 
                  alt={\`\${code} flag\`}
                  style={flagStyle} 
                />
              ) : (
                <span style={{ marginRight: '8px' }}>{flag}</span>
              )}
              <span>{name}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Hidden native select for form submission if needed */}
      <input type="hidden" name={name} value={selectedCountry || ''} />
    </div>
  );
};

export default ${componentName};`;
}

module.exports = {
  getReactCountrySelect,
  getReactCountryComponent
};
