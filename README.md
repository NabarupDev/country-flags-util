# Country Flags Utility

[![npm version](https://img.shields.io/npm/v/country-flags-util.svg)](https://www.npmjs.com/package/country-flags-util)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive utility library for working with countries, flag emojis, flag images, and generating country select dropdowns across various frameworks.

## Features

- 🌍 Get a list of all countries with their ISO codes and flag emojis
- 🏳️ Convert country codes to flag emojis
- 🖼️ Generate flag image URLs using [flagcdn.com](https://flagcdn.com)
- 📋 Create country select dropdowns with flags (emoji or images)
- ⚛️ Framework support for React, Angular, and vanilla JavaScript
- 🎨 Customizable display options and styling

## Installation

```bash
npm install country-flags-util
```

## Table of Contents

- [Basic Usage](#basic-usage)
- [API Reference](#api-reference)
  - [Core Functions](#core-functions)
  - [Framework-specific Functions](#framework-specific-functions)
- [Examples](#examples)
  - [React Example](#react-example)
  - [Angular Example](#angular-example)
  - [Vanilla JavaScript Example](#vanilla-javascript-example)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

## Basic Usage

```javascript
const { 
  getAllCountries, 
  getFlagEmoji, 
  getFlagImageUrl, 
  getCountrySelect 
} = require('country-flags-util');

// Get all countries with their flags
const countries = getAllCountries();
console.log(countries[0]); // { name: "Afghanistan", code: "AF", flag: "🇦🇫" }

// Get flag emoji for a specific country code
const usFlag = getFlagEmoji('US');
console.log(usFlag); // 🇺🇸

// Get flag image URL from flagcdn.com
const ukFlagUrl = getFlagImageUrl('GB', 80);
console.log(ukFlagUrl); // https://flagcdn.com/w80/gb.png

// Generate HTML for a country select dropdown with image flags (default)
const selectHTML = getCountrySelect({
  id: 'my-countries',
  name: 'country-selector',
  className: 'form-control',
  selectedCode: 'CA'
});

// Generate HTML for a country select dropdown with emoji flags
const emojiSelectHTML = getCountrySelect({
  selectedCode: 'JP',
  useImageFlags: false
});
```

## API Reference

### Core Functions

#### `getAllCountries()`

Returns an array of objects containing country information.

**Returns:**
- `Array<Object>`: Array of country objects with the following properties:
  - `name` (String): The country name
  - `code` (String): The 2-letter ISO country code
  - `flag` (String): The emoji flag for the country

**Example:**
```javascript
const countries = getAllCountries();
// [
//   { name: "Afghanistan", code: "AF", flag: "🇦🇫" },
//   { name: "Åland Islands", code: "AX", flag: "🇦🇽" },
//   ...
// ]
```

#### `getFlagEmoji(code)`

Converts a 2-letter ISO country code to an emoji flag.

**Parameters:**
- `code` (String): The 2-letter ISO country code (e.g., "US", "IN")

**Returns:**
- `String`: The flag emoji or an empty string if the code is invalid

**Example:**
```javascript
const flag = getFlagEmoji('JP');
console.log(flag); // 🇯🇵
```

#### `getFlagImageUrl(code, width)`

Gets the flag image URL from flagcdn.com.

**Parameters:**
- `code` (String): The 2-letter ISO country code (e.g., "US", "IN")
- `width` (Number, optional): The width of the flag image in pixels (default: 40)

**Returns:**
- `String`: URL to the flag image or an empty string if the code is invalid

**Example:**
```javascript
const flagUrl = getFlagImageUrl('DE', 80);
console.log(flagUrl); // https://flagcdn.com/w80/de.png
```

#### `getCountrySelect(options)`

Generates HTML for a select dropdown with country flags and names.

**Parameters:**
- `options` (Object, optional): Configuration object with the following properties:
  - `id` (String): HTML id attribute for the select element (default: 'country-select')
  - `name` (String): HTML name attribute for the select element (default: 'country')
  - `className` (String): HTML class attribute for the select element (default: '')
  - `selectedCode` (String): Country code to be selected by default (default: '')
  - `useImageFlags` (Boolean): Whether to use image flags instead of emoji flags (default: true)
  - `flagWidth` (Number): Width of flag images in pixels (default: 40)

**Returns:**
- `String`: HTML string for the country select dropdown

**Example:**
```javascript
const html = getCountrySelect({
  id: 'my-country-select',
  className: 'form-control',
  selectedCode: 'FR',
  useImageFlags: true,
  flagWidth: 30
});
```

### Framework-specific Functions

#### React

The React module provides functions to generate JSX code and full React components.

```javascript
import React, { useState, useRef, useEffect } from 'react';
import { getAllCountries, getFlagImageUrl, getFlagEmoji } from 'country-flags-util';

export default function CountrySelectPage() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [useImageFlags, setUseImageFlags] = useState(true);
  const [enableSearch, setEnableSearch] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const countries = getAllCountries();
  const dropdownRef = useRef(null);
  const selectedItemRef = useRef(null);
  
  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode);
    setIsDropdownOpen(false);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Scroll to selected country when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && selectedCountry && selectedItemRef.current) {
      // Small delay to ensure dropdown is fully rendered
      setTimeout(() => {
        selectedItemRef.current.scrollIntoView({
          behavior: 'auto',
          block: 'center'
        });
      }, 100);
    }
  }, [isDropdownOpen, selectedCountry]);
  
  // Find selected country data
  const selectedCountryData = countries.find(country => country.code === selectedCountry);
  
  // Filter countries based on search term
  const filteredCountries = searchTerm && enableSearch
    ? countries.filter(country => 
        country.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : countries;
  
  // Function to assign ref to selected country list item
  const getItemRef = (code) => {
    if (code === selectedCountry) {
      return selectedItemRef;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md  md:max-w-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Country Select Example</h1>
        
        {/* Toggle for flag type */}
        <div className="mb-6">
          <label className="inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={useImageFlags}
              onChange={() => setUseImageFlags(!useImageFlags)}
              className="sr-only peer" 
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900">
              {useImageFlags ? 'Using Image Flags' : 'Using Emoji Flags'}
            </span>
          </label>
        </div>
        
        {/* Toggle for search functionality */}
        <div className="mb-6">
          <label className="inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={enableSearch}
              onChange={() => setEnableSearch(!enableSearch)}
              className="sr-only peer" 
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900">
              {enableSearch ? 'Search Enabled' : 'Search Disabled'}
            </span>
          </label>
        </div>
        
        {/* Country Select Dropdown */}
        <div className="mb-6">
          <label htmlFor="country-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select a Country
          </label>
          
          {useImageFlags ? (
            // Custom dropdown for image flags
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border text-left"
              >
                {selectedCountry ? (
                  <div className="flex items-center">
                    <img 
                      src={getFlagImageUrl(selectedCountry, 40)} 
                      alt={selectedCountryData?.name} 
                      className="h-5 w-auto mr-2"
                    />
                    <span>{selectedCountryData?.name || 'Choose a country...'}</span>
                  </div>
                ) : (
                  <span>Choose a country...</span>
                )}
              </button>
              
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {enableSearch && (
                    <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
                      <input
                        type="text"
                        placeholder="Search countries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  )}
                  <ul className="py-1">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map(({ code, name }) => (
                        <li 
                          key={code} 
                          onClick={() => handleCountryChange(code)}
                          className={`flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer ${
                            code === selectedCountry 
                              ? 'bg-blue-50 animate-[pulse_1.5s_ease-in-out]' 
                              : ''
                          }`}
                          ref={getItemRef(code)}
                        >
                          <img 
                            src={getFlagImageUrl(code, 40)} 
                            alt={name} 
                            className="h-5 w-8 object-cover mr-2"
                          />
                          <span>{name}</span>
                        </li>
                      ))
                    ) : (
                      <li className="px-3 py-2 text-gray-500">No countries found</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            // Regular dropdown with emoji flags
            <div className="relative" ref={dropdownRef}>
              {enableSearch ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border text-left"
                  >
                    {selectedCountry ? (
                      <div className="flex items-center">
                        <span className="mr-2">{getFlagEmoji(selectedCountry)}</span>
                        <span>{selectedCountryData?.name || 'Choose a country...'}</span>
                      </div>
                    ) : (
                      <span>Choose a country...</span>
                    )}
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
                        <input
                          type="text"
                          placeholder="Search countries..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <ul className="py-1">
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map(({ code, name }) => (
                            <li 
                              key={code} 
                              onClick={() => handleCountryChange(code)}
                              className={`flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer ${code === selectedCountry ? 'bg-blue-50' : ''}`}
                              ref={getItemRef(code)}
                            >
                              <span className="mr-2 inline-block w-8 text-center">{getFlagEmoji(code)}</span>
                              <span>{name}</span>
                            </li>
                          ))
                        ) : (
                          <li className="px-3 py-2 text-gray-500">No countries found</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <select
                  id="country-select"
                  value={selectedCountry}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
                >
                  <option value="">Choose a country...</option>
                  {countries.map(({ code, name }) => (
                    <option key={code} value={code}>
                      {getFlagEmoji(code)} {name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}
        </div>
        
        {/* Selected Country Display */}
          {selectedCountryData && (
            <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Selected Country</h2>
              <div className="flex items-center space-x-3">
                {useImageFlags ? (
                  <img 
                    src={getFlagImageUrl(selectedCountryData.code, 40)} 
                    alt={selectedCountryData.code} 
                    className="w-12 h-auto"
                  />
                ) : (
                  <span className="text-4xl">{getFlagEmoji(selectedCountryData.code)}</span>
                )}
                <div>
                  <p className="font-medium text-gray-800">{selectedCountryData.name}</p>
                  <p className="text-sm text-gray-500">Code: {selectedCountryData.code}</p>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
```

#### Demo Video

Click below to watch the React component in action:

https://github.com/user-attachments/assets/3513980f-1669-4413-a5ce-df3c79db6ecb

The video demonstrates:
- Country selection with flag images
- Dropdown interaction and searching
- Switching between emoji and image flags
- Responsive design on different screen sizes

#### Angular

The Angular module provides functions to generate template code and full Angular components.

```javascript
const { angular, getAllCountries } = require('country-flags-util');

// Generate Angular template code
const templateCode = angular.getAngularCountrySelect(getAllCountries(), {
  id: 'angular-country-select',
  ngModel: 'selectedCountry',
  useImageFlags: true,
  flagWidth: 25
});

// Generate a complete Angular component with module
const { component, module, usage } = angular.getAngularCountryComponent(true);
```

#### Vanilla JavaScript

The Vanilla JS module provides functions to generate JavaScript code for plain web applications.

```javascript
const { vanilla } = require('country-flags-util');

// Generate vanilla JS code
const jsCode = vanilla.getVanillaJsCode({
  containerId: 'country-container',
  selectId: 'vanilla-country-select',
  selectClass: 'form-select',
  selectedCode: 'AU',
  useImageFlags: true,
  flagWidth: 30
});

// Generate complete HTML & JS implementation
const { html, js } = vanilla.getVanillaImplementation({
  containerId: 'country-container',
  selectId: 'country-select'
});
```

## Examples

### React Example

```jsx
// Using the generated component
import React, { useState, useRef, useEffect } from 'react';
import { getAllCountries, getFlagImageUrl, getFlagEmoji } from 'country-flags-util';

export default function CountrySelectPage() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [useImageFlags, setUseImageFlags] = useState(true);
  const [enableSearch, setEnableSearch] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const countries = getAllCountries();
  const dropdownRef = useRef(null);
  const selectedItemRef = useRef(null);
  
  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode);
    setIsDropdownOpen(false);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Scroll to selected country when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && selectedCountry && selectedItemRef.current) {
      // Small delay to ensure dropdown is fully rendered
      setTimeout(() => {
        selectedItemRef.current.scrollIntoView({
          behavior: 'auto',
          block: 'center'
        });
      }, 100);
    }
  }, [isDropdownOpen, selectedCountry]);
  
  // Find selected country data
  const selectedCountryData = countries.find(country => country.code === selectedCountry);
  
  // Filter countries based on search term
  const filteredCountries = searchTerm && enableSearch
    ? countries.filter(country => 
        country.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : countries;
  
  // Function to assign ref to selected country list item
  const getItemRef = (code) => {
    if (code === selectedCountry) {
      return selectedItemRef;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md  md:max-w-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Country Select Example</h1>
        
        {/* Toggle for flag type */}
        <div className="mb-6">
          <label className="inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={useImageFlags}
              onChange={() => setUseImageFlags(!useImageFlags)}
              className="sr-only peer" 
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900">
              {useImageFlags ? 'Using Image Flags' : 'Using Emoji Flags'}
            </span>
          </label>
        </div>
        
        {/* Toggle for search functionality */}
        <div className="mb-6">
          <label className="inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={enableSearch}
              onChange={() => setEnableSearch(!enableSearch)}
              className="sr-only peer" 
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900">
              {enableSearch ? 'Search Enabled' : 'Search Disabled'}
            </span>
          </label>
        </div>
        
        {/* Country Select Dropdown */}
        <div className="mb-6">
          <label htmlFor="country-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select a Country
          </label>
          
          {useImageFlags ? (
            // Custom dropdown for image flags
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border text-left"
              >
                {selectedCountry ? (
                  <div className="flex items-center">
                    <img 
                      src={getFlagImageUrl(selectedCountry, 40)} 
                      alt={selectedCountryData?.name} 
                      className="h-5 w-auto mr-2"
                    />
                    <span>{selectedCountryData?.name || 'Choose a country...'}</span>
                  </div>
                ) : (
                  <span>Choose a country...</span>
                )}
              </button>
              
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {enableSearch && (
                    <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
                      <input
                        type="text"
                        placeholder="Search countries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  )}
                  <ul className="py-1">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map(({ code, name }) => (
                        <li 
                          key={code} 
                          onClick={() => handleCountryChange(code)}
                          className={`flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer ${
                            code === selectedCountry 
                              ? 'bg-blue-50 animate-[pulse_1.5s_ease-in-out]' 
                              : ''
                          }`}
                          ref={getItemRef(code)}
                        >
                          <img 
                            src={getFlagImageUrl(code, 40)} 
                            alt={name} 
                            className="h-5 w-8 object-cover mr-2"
                          />
                          <span>{name}</span>
                        </li>
                      ))
                    ) : (
                      <li className="px-3 py-2 text-gray-500">No countries found</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            // Regular dropdown with emoji flags
            <div className="relative" ref={dropdownRef}>
              {enableSearch ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border text-left"
                  >
                    {selectedCountry ? (
                      <div className="flex items-center">
                        <span className="mr-2">{getFlagEmoji(selectedCountry)}</span>
                        <span>{selectedCountryData?.name || 'Choose a country...'}</span>
                      </div>
                    ) : (
                      <span>Choose a country...</span>
                    )}
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
                        <input
                          type="text"
                          placeholder="Search countries..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <ul className="py-1">
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map(({ code, name }) => (
                            <li 
                              key={code} 
                              onClick={() => handleCountryChange(code)}
                              className={`flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer ${code === selectedCountry ? 'bg-blue-50' : ''}`}
                              ref={getItemRef(code)}
                            >
                              <span className="mr-2 inline-block w-8 text-center">{getFlagEmoji(code)}</span>
                              <span>{name}</span>
                            </li>
                          ))
                        ) : (
                          <li className="px-3 py-2 text-gray-500">No countries found</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <select
                  id="country-select"
                  value={selectedCountry}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
                >
                  <option value="">Choose a country...</option>
                  {countries.map(({ code, name }) => (
                    <option key={code} value={code}>
                      {getFlagEmoji(code)} {name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}
        </div>
        
        {/* Selected Country Display */}
          {selectedCountryData && (
            <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Selected Country</h2>
              <div className="flex items-center space-x-3">
                {useImageFlags ? (
                  <img 
                    src={getFlagImageUrl(selectedCountryData.code, 40)} 
                    alt={selectedCountryData.code} 
                    className="w-12 h-auto"
                  />
                ) : (
                  <span className="text-4xl">{getFlagEmoji(selectedCountryData.code)}</span>
                )}
                <div>
                  <p className="font-medium text-gray-800">{selectedCountryData.name}</p>
                  <p className="text-sm text-gray-500">Code: {selectedCountryData.code}</p>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
```

#### Demo Video

Click below to watch the React component in action:

[![React Country Select Demo](https://img.shields.io/badge/Watch-Demo%20Video-blue?style=for-the-badge&logo=react)](https://github.com/user-attachments/assets/3513980f-1669-4413-a5ce-df3c79db6ecb)

The video demonstrates:
- Country selection with flag images
- Dropdown interaction and searching
- Switching between emoji and image flags
- Responsive design on different screen sizes

### Angular Example

```typescript
// country.component.ts
import { Component } from '@angular/core';
import { getAllCountries, getFlagImageUrl } from 'country-flags-util';

@Component({
  selector: 'app-country-selector',
  template: `
    <select [(ngModel)]="selectedCountry" (ngModelChange)="onCountryChange($event)" class="form-control">
      <option *ngFor="let country of countries" [value]="country.code">
        <img [src]="getFlagUrl(country.code)" [alt]="country.name" style="width: 30px; margin-right: 5px;">
        {{ country.name }}
      </option>
    </select>
  `
})
export class CountrySelectorComponent {
  countries = getAllCountries();
  selectedCountry = 'US';
  
  getFlagUrl(code: string): string {
    return getFlagImageUrl(code, 30);
  }
  
  onCountryChange(countryCode: string): void {
    console.log('Selected country:', countryCode);
  }
}
```

### Vanilla JavaScript Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Country Selector Example</title>
  <script src="node_modules/country-flags-util/index.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const container = document.getElementById('country-container');
      const { getAllCountries, getFlagImageUrl } = countryFlagsUtil;
      
      const countrySelect = document.createElement('select');
      countrySelect.id = 'country-select';
      countrySelect.className = 'form-select';
      
      getAllCountries().forEach(function(country) {
        const option = document.createElement('option');
        option.value = country.code;
        
        const flagImg = document.createElement('img');
        flagImg.src = getFlagImageUrl(country.code, 30);
        flagImg.alt = country.code;
        flagImg.style.width = '30px';
        flagImg.style.marginRight = '5px';
        flagImg.style.verticalAlign = 'middle';
        
        option.appendChild(flagImg);
        option.appendChild(document.createTextNode(country.name));
        
        if(country.code === 'US') {
          option.selected = true;
        }
        
        countrySelect.appendChild(option);
      });
      
      countrySelect.addEventListener('change', function(e) {
        console.log('Selected country:', e.target.value);
      });
      
      container.appendChild(countrySelect);
    });
  </script>
</head>
<body>
  <h1>Country Selector</h1>
  <div id="country-container"></div>
</body>
</html>
```

## Browser Support

This library uses Unicode flag emojis which are supported in most modern browsers. Image flags using flagcdn.com are supported across all browsers.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Made with ❤️ by [Nabarup Roy](https://github.com/NabarupDev)
