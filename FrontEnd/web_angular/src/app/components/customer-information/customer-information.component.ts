import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import Utils from 'src/app/utils';

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.css'],
})
export class CustomerInformationComponent implements OnInit {
  @Input() fieldValues: any = {};
  contentBirthday: string = '';
  contentAddress: string = '';
  closeResult: string = '';
  modalCall: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.contentBirthday = this.fieldValues?.birthday
      ? Utils.convertDate(new Date(this.fieldValues?.birthday))
      : 'Não informada';

    this.contentAddress = Utils.formatAddress(this.fieldValues);
  }

  onClickModal() {
    this.modalCall++;
  }

  ngOnChanges(changes: SimpleChanges) {
    const value = changes['fieldValues'];
    if (value.firstChange) return;
    this.contentBirthday = value.currentValue?.birthday
      ? Utils.convertDate(new Date(value.currentValue?.birthday))
      : 'Não informada';
    this.contentAddress = Utils.formatAddress(value.currentValue);
  }
}
