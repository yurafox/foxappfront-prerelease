import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgControl } from '@angular/forms';


@Directive({
    selector: '[mask]'
})
export class MaskComponent {

    static readonly ALPHA = 'A';
    static readonly NUMERIC = '9';
    static readonly ALPHANUMERIC = '?';
    static readonly REGEX_MAP = new Map([
        [MaskComponent.ALPHA, /\w/],
        [MaskComponent.NUMERIC, /\d/],
        [MaskComponent.ALPHANUMERIC, /\w|\d/],
    ]);

    value: string = null;
    displayValue: string = null;

    @Input('mask')
    maskGenerator: string;

    @Output('spMaskValueChange')
    changeEmitter = new EventEmitter<string>();

    @HostListener('input', ['$event'])
    public onInput(event: { target: { value?: string }}): void {
        let target = event.target;
        let value = target.value;
        this.onValueChange(value);
    }

    constructor(public ngControl: NgControl) { }

    public updateValue(value: string) {
        this.value = value;
        this.changeEmitter.emit(value);
        MaskComponent.delay().then(
            () => this.ngControl.control.updateValueAndValidity()
        );
    }


    public onValueChange(newValue: string) {
        if (newValue !== this.displayValue) {
            let displayValue = newValue;
            let value = newValue;

            if ((newValue == null) || (newValue.trim() === '')) {
                value = null;
            } else if (this.maskGenerator) {
                let mask = this.maskGenerator;
                displayValue = MaskComponent.mask(newValue, mask);
                value = MaskComponent.unmask(displayValue, mask);
            }

            this.displayValue = displayValue;

            if (newValue !== displayValue) {
                this.ngControl.control.setValue(displayValue);
            }

            if (value !== this.value) {
                this.updateValue(value);
            }
        }
    }


  public static mask(value: string, mask: string): string {
        value = value.toString();

        let len = value.length;
        let maskLen = mask.length;
        let pos = 0;
        let newValue = '';

        for (let i = 0; i < Math.min(len, maskLen); i++) {
            let maskChar = mask.charAt(i);
            let newChar = value.charAt(pos);
            let regex: RegExp = MaskComponent.REGEX_MAP.get(maskChar);

            if (regex) {
                pos++;

                if (regex.test(newChar)) {
                    newValue += newChar;
                } else {
                    i--;
                    len--;
                }
            } else {
                if (maskChar === newChar) {
                    pos++;
                } else {
                    len++;
                }

                newValue += maskChar;
            }
        }

        return newValue;
    }

  public static unmask(maskedValue: string, mask: string): string {
        let maskLen = (mask && mask.length) || 0;
        return maskedValue.split('').filter(
            (currChar, idx) => (idx < maskLen) && MaskComponent.REGEX_MAP.has(mask[idx])
        ).join('');
    }

  public static delay(ms: number = 0): Promise<void> {
        return new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => null);
    }
}

export interface MaskGenerator {
  generateMask: (value: string) => string;
}
