import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-field',
  templateUrl: './card-field.component.html',
  styleUrls: ['./card-field.component.css'],
})
export class CardFieldComponent implements OnInit {
  @Input() field: string = '';
  @Input() value: string | number | null | undefined = '';

  constructor() {}

  ngOnInit() {}
}
