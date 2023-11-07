import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-with-icon',
  templateUrl: './text-with-icon.component.html',
  styleUrls: ['./text-with-icon.component.css'],
})
export class TextWithIconComponent implements OnInit {
  iconName: string = '';
  @Input() icon?: string = '';
  @Input() title: string = '';
  @Input() content: string = '';

  constructor() {}

  ngOnInit(): void {
    this.iconName = `bi ${this.icon}`;
  }
}
