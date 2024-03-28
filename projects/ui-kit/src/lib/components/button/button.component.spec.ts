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
});
