import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() width = '100%';
  @Input() label = '';
  @Input() onBlur = () => {};
  @Input() typeInput = 'text';
  @Input() id = '';
  @Input() placeholder = '';
  @Input() value: any = {};
  @Input() name: string = '';
  valueInput = this.value[this.name] || '';
  @Input() formatValue? = false;
  @Input() mask = (value: any) => '';
  @Output() setValue = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.valueInput = this.value[this.name] || '';
  }

  onChange(event: any) {
    const value = this.formatValue
      ? this.mask(event.target.value)
      : event.target.value;

    this.setValue.emit({
      ...this.value,
      [this.name]: value,
    });

    this.valueInput = value;
  }

  ngOnChanges(changes: SimpleChanges) {
    const value = changes['value'];
    if (value.firstChange) return;
    this.valueInput = value.currentValue[this.name] || '';
  }
}
