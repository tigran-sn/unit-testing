import { Component, createComponent } from '@angular/core';
import { CanDisableDirective } from './can-disable.directive';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('CanDisableDirective', () => {
  it('should apply neccessary classes and attributes', () => {
    const { linkDebugEl } = setup();

    expect(linkDebugEl.nativeElement.classList).toContain('disabled');
    expect(linkDebugEl.nativeElement.getAttribute('disabled')).not.toBeNull();
  });

  it('should prevend the default behaviour', () => {
    const { linkDebugEl } = setup();
    const clickEvent = new PointerEvent('click', {
      cancelable: true,
    });

    linkDebugEl.triggerEventHandler('click', clickEvent);
    expect(clickEvent.defaultPrevented).toBe(true);

    const dblclickEvent = new PointerEvent('dblclick', {
      cancelable: true,
    });
    expect(dblclickEvent.defaultPrevented).toBe(true);
  });
});

function setup() {
  @Component({
    standalone: true,
    imports: [CanDisableDirective],
    template: `
      <a href="" dfCanDisable [disabled]="disabled">Disabled Link</a>
    `,
  })
  class CanDisableTestHost {
    disabled = false;
  }

  const fixture = TestBed.createComponent(CanDisableTestHost);
  const linkDebugEl = fixture.debugElement.query(
    By.directive(CanDisableDirective)
  );

  fixture.componentInstance.disabled = true;
  fixture.detectChanges();

  return {
    fixture,
    linkDebugEl,
  };
}
