import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css'],
})
export class TextComponent implements OnInit {
  titleSpan: string = '';
  @Input() title: string = '';
  @Input() content: string = '';

  constructor() {}

  ngOnInit(): void {
    this.titleSpan = `${this.title}: `;
  }
}
