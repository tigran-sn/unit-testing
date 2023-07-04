import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BUTTON_CLASSES, ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonComponent],
    });
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should show loader in "loading" state', () => {
    let loader = el.query(By.css(`[data-test="loader"]`));
    expect(loader).toBeFalsy();

    fixture.componentRef.setInput('loading', true);

    fixture.detectChanges();

    loader = el.query(By.css(`[data-test="loader"]`));
    expect(loader).toBeTruthy();
  });
  it('should apply proper CSS classes when appearance changes', () => {
    expect(el.classes[BUTTON_CLASSES.solid])
      .withContext(`Should be "solid" by default`)
      .toBeDefined();

    component.appearance = 'stroked';
    fixture.detectChanges();

    expect(el.classes[BUTTON_CLASSES.solid]).toBeFalsy();
    expect(el.classes[BUTTON_CLASSES.stroked]).toBeTrue();
  });
});
