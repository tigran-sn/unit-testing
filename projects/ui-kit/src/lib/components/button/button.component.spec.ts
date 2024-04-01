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
      // The HostBindings will be checked as part of CD cycle, that's why we don't nedd to use setInput here
      component.appearance = 'stroked';
      fixture.detectChanges();
      expect(el.query(By.css(BUTTON_CLASSES.stroked))).toBeDefined();
    });

    it('should have dashed appearance', () => {
      // The HostBindings will be checked as part of CD cycle, that's why we don't nedd to use setInput here
      component.appearance = 'dashed';
      fixture.detectChanges();
      expect(el.query(By.css(BUTTON_CLASSES.dashed))).toBeDefined();
    });
  });

  describe('ButtonComponent loading state', () => {
    it('should show loader icon on "loading" state', () => {
      /*
        Skipping the part, where the component is marked as dirty and also it is not triggering ngOnChanges lifecycle hook
        That's why we we need to use "setInput"
        "setInput" is marking the component as dirty and causes the "ngOnChanges" to be executed
      */
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();
      let loader = el.query(By.css('[data-testingId="loader"]'));
      expect(loader).not.toBeNull();

      /*
        Skipping the part, where the component is marked as dirty and also it is not triggering ngOnChanges lifecycle hook
        That's why we we need to use "setInput"
        "setInput" is marking the component as dirty and causes the "ngOnChanges" to be executed
      */
      fixture.componentRef.setInput('loading', false);
      fixture.detectChanges();
      loader = el.query(By.css('[data-testingId="loader"]'));
      expect(loader).toBeNull();
    });
  });

  describe('Disabled state', () => {
    it('should apply neccessary attrinutes to component host', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(el.nativeElement.classList).toContain('disabled');
      expect(el.nativeElement.getAttribute('disabled')).not.toBeNull();
      expect(el.nativeElement.getAttribute('tabIndex')).toBe('-1');
    });
  });
});
