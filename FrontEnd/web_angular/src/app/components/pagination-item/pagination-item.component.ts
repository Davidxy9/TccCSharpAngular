import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination-item',
  templateUrl: './pagination-item.component.html',
  styleUrls: ['./pagination-item.component.css'],
})
export class PaginationItemComponent implements OnInit {
  @Input() isCurrent: boolean = false;
  @Input() content: number | string = '';
  @Output() onPageChange = new EventEmitter();

  classStyle: string = 'page-item';
  cursorDiv: object = {};

  constructor() {}

  setStyle() {
    if (this.isCurrent) {
      this.classStyle += ' active';
    }
    this.cursorDiv = {
      pointerEvents: typeof this.content === 'string' ? 'none' : 'auto',
    };
  }

  ngOnInit(): void {
    this.setStyle();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setStyle();
  }

  pageChange() {
    this.onPageChange.emit(this.content);
  }
}
