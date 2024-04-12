import { TestBed } from '@angular/core/testing';
import { ChipComponent } from './chip.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Chip Component', () => {
  it('should create a chip component', () => {
    const fixture = TestBed.createComponent(ChipComponent);
    const chip = fixture.componentInstance;
    expect(chip).toBeTruthy();
  });
  it('should emit event if remove icon is clicked', () => {
    let expectedValue: any;
    const fixture = TestBed.createComponent(ChipComponent);
    fixture.componentRef.setInput('removable', true);
    fixture.componentInstance.removed.subscribe(
      (chip: any) => (expectedValue = chip)
    );

    fixture.detectChanges();

    const removeIcon = fixture.debugElement.query(
      By.css('[data-testingId="remove"]')
    );

    removeIcon.triggerEventHandler('click');

    expect(expectedValue).toBe(fixture.componentInstance);
  });
});

function setup() {
  @Component({
    standalone: true,
    imports: [ChipComponent],
    template: ` <df-chip>Angular</df-chip> `,
  })
  class ChipTestHost {
    removable = false;
  }
  const fixture = TestBed.createComponent(ChipTestHost);
  const chipDebugEl = fixture.debugElement.query(By.directive(ChipComponent));
  fixture.detectChanges();

  return {
    fixture,
    chipDebugEl,
  };
}
