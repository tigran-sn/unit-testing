import { TaxCalculatorService } from './tax-calculator.service';

describe('TaxCalculator Service', () => {
  let service: TaxCalculatorService;
  beforeEach(() => {
    service = new TaxCalculatorService();
  });

  describe('TaxCalculatorService: Error handling', () => {
    it('should throw an error when countryKey is not supported', () => {
      expect(() => service.calculateVAT(100, 'ru')).toThrowError(
        /isn't supported/
      );
    });
    it('should throw an error when the price is less than 0', () => {
      expect(() => service.calculateVAT(-100, 'uk')).toThrowError(
        /not be a negative number/
      );
    });
  });
  it('should return 0, if "isB2B" is true', () => {
    const result = service.calculateVAT(100, 'uk', true);
    expect(result).toBe(0);
  });
  it('should calculate the VAT', () => {
    const result = service.calculateVAT(100, 'uk');
    expect(result).toBe(20);
  });
});
