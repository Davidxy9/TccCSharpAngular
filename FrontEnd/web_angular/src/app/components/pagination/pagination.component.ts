import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { IPagination } from 'src/app/@types/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() totalCountOfRegisters: number = 0;
  @Input() registersPerPage: number = 10;
  @Input() currentPage: number = 1;
  lastPage: number = 0;
  previousPage: number[] = [];
  nextPage: number[] = [];
  siblingsCount: number = 1;
  @Output() onPageChange = new EventEmitter();
  @Output() onPerPage = new EventEmitter();

  generatePagesArray(from: number, to: number) {
    return [...new Array(to - from)]
      .map((_, index) => {
        return from + index + 1;
      })
      .filter((page) => page > 0);
  }

  calcPagination({
    totalCountOfRegisters,
    registersPerPage,
    currentPage,
  }: IPagination) {
    const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

    this.lastPage = lastPage;
    this.previousPage =
      currentPage > 1
        ? this.generatePagesArray(
            currentPage - 1 - this.siblingsCount,
            currentPage - 1
          )
        : [];
    this.nextPage =
      currentPage < lastPage
        ? this.generatePagesArray(
            currentPage,
            Math.min(currentPage + this.siblingsCount, lastPage)
          )
        : [];
  }

  constructor() {}

  ngOnInit(): void {
    this.calcPagination({
      totalCountOfRegisters: this.totalCountOfRegisters,
      registersPerPage: this.registersPerPage,
      currentPage: this.currentPage,
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const obj = {
      currentPage: changes['currentPage']?.currentValue ?? this.currentPage,
      registersPerPage:
        changes['registersPerPage']?.currentValue ?? this.registersPerPage,
      totalCountOfRegisters:
        changes['totalCountOfRegisters']?.currentValue ??
        this.totalCountOfRegisters,
    };

    this.calcPagination({
      totalCountOfRegisters: obj.totalCountOfRegisters,
      registersPerPage: obj.registersPerPage,
      currentPage: obj.currentPage,
    });
  }

  onPerPageChange(value: number): void {
    this.onPerPage.emit(value);
  }

  onPage(value: string | number): void {
    if (this.currentPage === Number(value)) return;

    this.onPageChange.emit(value);

    const obj = {
      currentPage: Number(value) ?? this.currentPage,
      registersPerPage: this.registersPerPage,
      totalCountOfRegisters: this.totalCountOfRegisters,
    };

    this.calcPagination({
      totalCountOfRegisters: obj.totalCountOfRegisters,
      registersPerPage: obj.registersPerPage,
      currentPage: obj.currentPage,
    });
  }
}
