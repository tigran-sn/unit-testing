import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { ButtonModule } from './button.module';
import { Component, DebugElement } from '@angular/core';
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
    beforeEach(() => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
    });

    it('should apply neccessary attrinutes to component host', () => {
      expect(el.nativeElement.classList).toContain('disabled');
      expect(el.nativeElement.getAttribute('disabled')).not.toBeNull();
      expect(el.nativeElement.getAttribute('tabIndex')).toBe('-1');
    });

    it('Should prevent default behaviour', () => {
      const clickEvent = new PointerEvent('click', {
        cancelable: true,
      });
      el.triggerEventHandler('click', clickEvent);
      expect(clickEvent.defaultPrevented).toBe(true);
    });
  });
});

describe('ButtonComponent (with TestHost)', () => {
  it('sould properly project content', () => {
    const { buttonDebugEl } = setup();
    const label = buttonDebugEl.query(By.css('[data-testId="label"]'));

    expect(label.nativeNode.innerText).toBe('Testing Button');
  });

  describe('ButtonComponent appearance', () => {
    it('should have solid appearance by default', () => {
      const { buttonEl } = setup();
      expect(buttonEl.classList.contains(BUTTON_CLASSES.solid)).toBe(true);
    });
  });

  describe('ButtonComponent loading state', () => {
    it('should show loader icon on "loading" state', () => {
      const { hostComponent, fixture, buttonDebugEl } = setup();
      hostComponent.loading = true;
      fixture.detectChanges();
      let loader = buttonDebugEl.query(By.css('[data-testingId="loader"]'));
      expect(loader).not.toBeNull();

      hostComponent.loading = false;
      fixture.detectChanges();
      loader = buttonDebugEl.query(By.css('[data-testingId="loader"]'));
      expect(loader).toBeNull();
    });
  });
});

function setup() {
  @Component({
    template: ` <button [loading]="loading" dfButton>Testing Button</button> `,
  })
  class ButtonTestHost {
    loading = false;
  }

  TestBed.configureTestingModule({
    imports: [ButtonModule],
    declarations: [ButtonTestHost],
  });
  let fixture = TestBed.createComponent(ButtonTestHost);
  let buttonDebugEl = fixture.debugElement.query(By.directive(ButtonComponent));
  let buttonEl: HTMLElement = buttonDebugEl.nativeElement;
  let hostComponent = fixture.componentInstance;
  fixture.detectChanges();

  return {
    fixture,
    buttonDebugEl,
    buttonEl,
    hostComponent,
  };
}
