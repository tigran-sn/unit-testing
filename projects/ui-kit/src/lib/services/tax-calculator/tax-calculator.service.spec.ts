import {
  TaxCalculatorService,
  Country as Countries,
  COUNTRIES,
} from './tax-calculator.service';
import { TestBed } from '@angular/core/testing';

describe('TaxCalculator Service', () => {
  let service: TaxCalculatorService;
  TestBed;
  let testCountries: Countries;
  beforeEach(() => {
    testCountries = { de: { name: 'Germany', vat: 19 } };
    TestBed.configureTestingModule({
      providers: [{ provide: COUNTRIES, useValue: testCountries }],
    });
    TestBed.runInInjectionContext(() => {
      service = new TaxCalculatorService();
    });
  });

  describe('TaxCalculatorService: Error handling', () => {
    it('should throw an error when countryKey is not supported', () => {
      expect(() => service.calculateVAT(100, 'ru')).toThrowError(
        /isn't supported/
      );
    });
    it('should throw an error when the price is less than 0', () => {
      expect(() => service.calculateVAT(-100, 'de')).toThrowError(
        /not be a negative number/
      );
    });
  });
  it('should return 0, if "isB2B" is true', () => {
    const result = service.calculateVAT(100, 'de', true);
    expect(result).toBe(0);
  });
  it('should calculate the VAT', () => {
    const result = service.calculateVAT(100, 'de');
    expect(result).toBe(19);
  });
});
