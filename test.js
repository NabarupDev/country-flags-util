const { getAllCountries, getFlagEmoji, getCountrySelect } = require('./index');

// Test getAllCountries function
console.log('Testing getAllCountries():');
const countries = getAllCountries();
console.log(countries);

// Test getFlagEmoji function
console.log('\nTesting getFlagEmoji():');
console.log('India flag:', getFlagEmoji('IN'));
console.log('US flag:', getFlagEmoji('US'));
console.log('Invalid code:', getFlagEmoji('XXX'));

// Test the new getCountrySelect function
console.log('\nTesting getCountrySelect():');
console.log('Default country select HTML:');
console.log(getCountrySelect());

console.log('\nCustomized country select HTML:');
console.log(getCountrySelect({
  id: 'my-countries',
  name: 'my-country',
  className: 'country-dropdown',
  selectedCode: 'IN'
}));
