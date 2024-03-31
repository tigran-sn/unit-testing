import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { ButtonModule } from './button.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let el: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonModule],
    });
    fixture = TestBed.createComponent(ButtonComponent);
    el = fixture.debugElement;
    fixture.detectChanges(); // Initial CD
  });

  it('should create the component', () => {
    // Will work fine only in environments that has either emulated DOM or real DOM like at browser
    // expect(fixture.nativeElement.querySelector('.button-label')).toBeDefined();

    // Will work on every platform that Angular supports
    expect(el.query(By.css('[data-testId="button-label"]'))).toBeDefined();
  });

  describe('ButtonComponent appearance', () => {
    it('should have solid appearance by default', () => {
      expect(el.classes['solid-button']).toBe(true);
      expect(el.nativeElement.classList.contains('solid-button')).toBe(true);
      expect(el.query(By.css('.solid-button'))).toBeDefined();
    });

    it('should have stroked appearance', () => {
      fixture.componentInstance.appearance = 'stroked';
      fixture.detectChanges();
      expect(el.query(By.css('.stroked-button'))).toBeDefined();
    });

    it('should have dashed appearance', () => {
      fixture.componentInstance.appearance = 'dashed';
      fixture.detectChanges();
      expect(el.query(By.css('.dashed-button'))).toBeDefined();
    });
  });

  describe('ButtonComponent loading state', () => {
    it('should show loader icon on "loading" state', () => {
      el.componentInstance.loading = true;
      fixture.detectChanges();
      let loader = el.query(By.css('[data-testingId="loader"]'));
      expect(loader).not.toBeNull();

      el.componentInstance.loading = false;
      fixture.detectChanges();
      loader = el.query(By.css('[data-testingId="loader"]'));
      expect(loader).toBeNull();
    });
  });
});
