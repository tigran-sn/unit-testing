import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { ButtonModule } from './button.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BUTTON_CLASSES } from './button.component';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let el: DebugElement;
  let component: ButtonComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonModule],
    });
    fixture = TestBed.createComponent(ButtonComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;
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
      expect(el.classes[BUTTON_CLASSES.solid]).toBe(true);
      expect(el.nativeElement.classList.contains(BUTTON_CLASSES.solid)).toBe(
        true
      );
      expect(el.query(By.css(BUTTON_CLASSES.solid))).toBeDefined();
    });

    it('should have stroked appearance', () => {
      component.appearance = 'stroked';
      fixture.detectChanges();
      expect(el.query(By.css(BUTTON_CLASSES.stroked))).toBeDefined();
    });

    it('should have dashed appearance', () => {
      component.appearance = 'dashed';
      fixture.detectChanges();
      expect(el.query(By.css(BUTTON_CLASSES.dashed))).toBeDefined();
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
