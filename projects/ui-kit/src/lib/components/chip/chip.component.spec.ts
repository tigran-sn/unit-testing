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
