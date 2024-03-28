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
    expect(el.query(By.css('.button-label'))).toBeDefined();
  });

  describe('ButtonComponent appearance', () => {
    it('should have solid appearance by default', () => {
      expect(el.classes['solid-button']).toBe(true);
      expect(el.nativeElement.classList.contains('solid-button')).toBe(true);
      expect(el.nativeElement).toContain('solid-button');
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
    it('should not have loading state by default', () => {
      expect(el.query(By.css('.loader'))).toBeNull();
    });

    it('should have loading state', () => {
      fixture.componentInstance.loading = true;
      fixture.detectChanges();
      expect(el.query(By.css('.loader'))).toBeDefined();
    });

    it('should have loading state', () => {
      fixture.componentInstance.loading = false;
      fixture.detectChanges();
      expect(el.query(By.css('.loader'))).toBeNull();
    });
  });
});
