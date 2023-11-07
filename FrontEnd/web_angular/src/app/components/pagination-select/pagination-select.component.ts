import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination-select',
  templateUrl: './pagination-select.component.html',
  styleUrls: ['./pagination-select.component.css'],
})
export class PaginationSelectComponent implements OnInit {
  @Input() valuePerPage: number = 10;
  @Output() onPerPage = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onPerPageChange(event: any): void {
    const value = event.target.value;
    this.valuePerPage = value;
    this.onPerPage.emit(Number(value));
  }
}
