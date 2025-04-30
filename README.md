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
const { react, getAllCountries } = require('country-flags-util');

// Generate JSX code for a React select component
const jsxCode = react.getReactCountrySelect(getAllCountries(), {
  id: 'react-country-select',
  onChange: 'handleCountryChange',
  defaultValue: 'CA',
  useImageFlags: true,
  flagWidth: 30
});

// Generate a complete React component
const componentCode = react.getReactCountryComponent('CountrySelector');
```

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
import React from 'react';
import { CountrySelect } from 'country-flags-util/react';

function App() {
  const handleCountryChange = (e) => {
    console.log('Selected country:', e.target.value);
  };

  return (
    <div className="App">
      <h1>Country Selector</h1>
      <CountrySelect 
        id="country-selector"
        className="form-select"
        defaultValue="US"
        onChange={handleCountryChange}
        useImageFlags={true}
        flagWidth={30}
      />
    </div>
  );
}

export default App;
```

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
