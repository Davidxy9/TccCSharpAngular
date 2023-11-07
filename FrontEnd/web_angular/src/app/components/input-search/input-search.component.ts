import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IClient } from 'src/app/@types/client';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css'],
})
export class InputSearchComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  @Input() clients: IClient[] = [];

  checkoutForm = this.formBuilder.group({
    valueInput: '',
  });

  @Output() search = new EventEmitter();

  ngOnInit(): void {}

  searchClients() {
    this.search.emit(this.checkoutForm.value?.valueInput || '');
  }
}
