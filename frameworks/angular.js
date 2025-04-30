/**
 * Generates HTML template code for an Angular country select component
 * @param {Array<{name: string, code: string, flag: string}>} countries - Array of country objects
 * @param {Object} [props] - Properties for the select element
 * @param {boolean} [props.useImageFlags=true] - Whether to use image flags instead of emoji flags
 * @param {number} [props.flagWidth=40] - Width of flag images in pixels
 * @returns {string} HTML template code for the Angular country select
 */
function getAngularCountrySelect(countries, props = {}) {
  if (!Array.isArray(countries)) {
    throw new Error('Countries must be an array');
  }

  const {
    id = 'country-select',
    name = 'country',
    className = '',
    ngModel = 'selectedCountry',
    useImageFlags = true,
    flagWidth = 40,
    ...otherProps
  } = props;

  const propsString = Object.entries({
    id,
    name,
    class: className,
    ...otherProps
  })
    .filter(([_, value]) => value !== '')
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  const optionsCode = countries
    .map(({ code, name, flag }) => {
      if (useImageFlags) {
        return `  <option [value]="${code}">
    <img [src]="'https://flagcdn.com/w${flagWidth}/${code.toLowerCase()}.png'" 
         [alt]="'${code}'" 
         style="margin-right: 5px; width: ${flagWidth}px; vertical-align: middle;" /> ${name}
  </option>`;
      } else {
        return `  <option [value]="${code}">${flag} ${name}</option>`;
      }
    })
    .join('\n');

  return `<select [(ngModel)]="${ngModel}" ${propsString}>
${optionsCode}
</select>`;
}

/**
 * Generates a complete Angular component for country selection
 * @param {boolean} [useImageFlags=true] - Whether to use image flags instead of emoji flags
 * @returns {Object} Object containing component, module, and usage code as strings
 */
function getAngularCountryComponent(useImageFlags = true) {
  const templateCode = useImageFlags ? 
    `<select 
      [id]="id"
      [name]="name"
      [ngClass]="className"
      [(ngModel)]="selectedCountry"
      (ngModelChange)="onCountryChange($event)"
    >
      <option *ngFor="let country of countries" [value]="country.code">
        <ng-container *ngIf="useImageFlags; else emojiFlag">
          <img [src]="getFlagImageUrl(country.code)" [alt]="country.code" 
               [style.width.px]="flagWidth" style="margin-right: 5px; vertical-align: middle;" />
        </ng-container>
        <ng-template #emojiFlag>{{country.flag}}</ng-template>
        {{country.name}}
      </option>
    </select>` :
    `<select 
      [id]="id"
      [name]="name"
      [ngClass]="className"
      [(ngModel)]="selectedCountry"
      (ngModelChange)="onCountryChange($event)"
    >
      <option *ngFor="let country of countries" [value]="country.code">
        {{ country.flag }} {{ country.name }}
      </option>
    </select>`;

  const componentCode = `import { Component, Input, Output, EventEmitter } from '@angular/core';
import { getAllCountries, getFlagImageUrl } from 'country-flags-util';

@Component({
  selector: 'app-country-select',
  template: \`${templateCode}\`,
  styles: []
})
export class CountrySelectComponent {
  @Input() id = 'country-select';
  @Input() name = 'country';
  @Input() className = '';
  @Input() selectedCountry = '';
  @Input() useImageFlags = ${useImageFlags};
  @Input() flagWidth = 40;
  
  @Output() countryChange = new EventEmitter<string>();
  
  countries = getAllCountries();
  
  getFlagImageUrl(code: string): string {
    return getFlagImageUrl(code, this.flagWidth);
  }
  
  onCountryChange(countryCode: string): void {
    this.countryChange.emit(countryCode);
  }
}`;

  const moduleCode = `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountrySelectComponent } from './country-select.component';

@NgModule({
  declarations: [CountrySelectComponent],
  imports: [CommonModule, FormsModule],
  exports: [CountrySelectComponent]
})
export class CountrySelectModule { }`;

  const usageCode = `<app-country-select
  id="my-countries"
  name="my-country"
  className="country-dropdown"
  [(selectedCountry)]="selectedCountryCode"
  [useImageFlags]="true"
  [flagWidth]="20"
  (countryChange)="onCountrySelected($event)"
></app-country-select>`;

  return {
    component: componentCode,
    module: moduleCode,
    usage: usageCode
  };
}

module.exports = {
  getAngularCountrySelect,
  getAngularCountryComponent
};
