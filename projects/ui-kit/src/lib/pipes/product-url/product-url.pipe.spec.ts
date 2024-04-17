import { TestBed } from '@angular/core/testing';
import { ProductUrlPipe } from './product-url.pipe';

describe('PoductUrlPipe', () => {
  let pipe: ProductUrlPipe;
  beforeEach(() => {
    pipe = new ProductUrlPipe();
  });
  it('should properly build the URL', () => {
    expect(pipe.transform(123)).toBe('https://test.com/product/123');
  });
  it('should throw an error when invalid id is provided', () => {
    expect(() => pipe.transform(0)).toThrowError(/Invalid product id/);
  });
});

function setup() {
  const fixture = TestBed.createComponent(ProductUrlPipe);
  const debugElement = fixture.debugElement;
}
