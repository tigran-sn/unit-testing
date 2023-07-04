import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { coerceToBoolean } from '../../utils/type-coercion';
import { CanDisableDirective } from '../../cdk/can-disable/can-disable.directive';

export const BUTTON_CLASSES = {
  solid: 'solid-button',
  stroked: 'stroked-button',
  dashed: 'stroked-button',
} as const;

export type ButtonAppearance = keyof typeof BUTTON_CLASSES;
export type ButtonClasses = (typeof BUTTON_CLASSES)[ButtonAppearance];

@Component({
  selector: 'button[dfButton], a[dfButton]',
  standalone: true,
  imports: [NgIf],
  template: `
    <span class="button-label">
      <ng-content></ng-content>
    </span>
    <span *ngIf="loading" data-test="loader" class="loader"></span>
  `,
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: CanDisableDirective,
      inputs: ['disabled'],
    },
  ],
})
export class ButtonComponent {
  @Input()
  appearance: ButtonAppearance = 'solid';

  @Input()
  set loading(value: any) {
    this.#loading = coerceToBoolean(value);
  }
  get loading(): boolean {
    return this.#loading;
  }
  #loading = false;

  @HostBinding('class')
  protected get buttonTypeHostClass(): ButtonClasses {
    return `${BUTTON_CLASSES[this.appearance]}`;
  }

  /**
   * TODO: implement feature to set tabIndex
   * 1. User should be able to set a custom tabIndex
   * 2. User should NOT be able to focus on disabled element
   *
   * */
}
