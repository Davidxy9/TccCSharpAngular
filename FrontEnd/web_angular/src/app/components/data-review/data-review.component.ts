import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-data-review',
  templateUrl: './data-review.component.html',
  styleUrls: ['./data-review.component.css'],
})
export class DataReviewComponent implements OnInit {
  @Input() fieldValues: any = {};
  @Output() setValue = new EventEmitter();
  @Output() onClickButtonSave = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onChangeField(values: any) {
    this.setValue.emit(values);
  }

  onClickSendData() {
    this.onClickButtonSave.emit();
  }
}
